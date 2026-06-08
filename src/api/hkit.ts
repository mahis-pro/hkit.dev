import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { UserRole } from "@/hooks/use-auth";
import { generateRandomPassword } from "@/lib/utils";

export type FacilityStatus = "verified" | "pending" | "rejected";

export interface Facility {
  id: number;
  name: string;
  lga: string;
  type: string;
  status: FacilityStatus;
  compliance: number;
  administrators: number;
  apiActivity: string;
  lastSync: string;
}

// --- New Registration Request Types ---

export interface RegistrationRequest {
  id: string;
  type: 'facility' | 'developer';
  data: any; // JSONB data from the form
  status: 'pending' | 'approved' | 'rejected';
  submitted_at: string;
}

export interface StateRegistrationData {
  stateName: string;
  ministryDepartment: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  estimatedFacilities: string;
}

export interface FacilityRegistrationData {
  facilityName: string;
  facilityType: string;
  lga: string;
  stateHieNode: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
}

export interface DeveloperRegistrationData {
  organizationName: string;
  systemName: string;
  technicalContactName: string;
  technicalContactEmail: string;
  useCase: string;
}

// --- MoH User Management Types ---

export type MoHInternalRole = 'MoH' | 'DataAnalyst' | 'SystemDeveloper';

export interface MoHUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: MoHInternalRole;
  status: 'Active' | 'Inactive';
  lastSignIn: string | null;
}

export interface MoHUserCreationParams {
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  role: MoHInternalRole;
}

// --- Supabase API Functions ---

// Hardcoded URL was pointing to an old project. We should use the Supabase client's URL or an env var.
const SUPABASE_PROJECT_URL = import.meta.env.VITE_SUPABASE_URL;
const MOH_USER_MANAGEMENT_URL = `${SUPABASE_PROJECT_URL}/functions/v1/manage-moh-users`;

async function invokeMoHUserManagement(action: string, payload?: any): Promise<any> {
  const isGet = action === 'GET_USERS';
  
  // Explicitly fetch token to guarantee it goes into the Headers (fixes edge case on GET requests)
  const { data: sessionData } = await supabase.auth.getSession();
  const token = sessionData.session?.access_token;

  if (!token) {
    throw new Error("Authentication required for MoH user management.");
  }
  
  const { data, error } = await supabase.functions.invoke('manage-moh-users', {
    method: isGet ? 'GET' : 'POST',
    body: isGet ? undefined : { action, payload },
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (error) {
    throw new Error(error.message || "Failed to invoke MoH user management");
  }
  
  if (data && data.error) {
    throw new Error(data.error);
  }
  
  return data;
}

export async function fetchMoHUsers(): Promise<MoHUser[]> {
  return invokeMoHUserManagement('GET_USERS');
}

export async function createMoHUser(params: MoHUserCreationParams): Promise<string> {
    // Generate a temporary password if not provided (required by the Edge Function)
    const password = params.password || generateRandomPassword(12);
    
    await invokeMoHUserManagement('CREATE_USER', {
        ...params,
        password: password,
    });
    
    return password;
}

export async function updateMoHUser(id: string, params: Partial<MoHUserCreationParams>): Promise<void> {
    await invokeMoHUserManagement('UPDATE_USER', {
        id,
        ...params,
    });
}

export async function deleteMoHUser(id: string): Promise<void> {
    await invokeMoHUserManagement('DELETE_USER', { id });
}


export async function fetchFacilities(role: UserRole, facilityId?: number): Promise<Facility[]> {
  let query = supabase
    .from('facilities')
    .select('*');

  if (role === 'FacilityAdmin' && facilityId) {
    // RLS should handle security, but we filter here for efficiency and clarity
    query = query.eq('id', facilityId);
  } else if (role !== 'MoH' && role !== 'FacilityAdmin') {
    // If not MoH or FacilityAdmin, return empty array (or throw error if strict)
    return [];
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching facilities:", error);
    throw new Error("Failed to fetch facilities data.");
  }
  
  // Map Supabase data structure to Facility interface
  return data.map(f => ({
    id: f.id,
    name: f.name,
    lga: f.lga || 'N/A',
    type: f.type || 'N/A',
    status: f.status as FacilityStatus,
    compliance: f.compliance || 0,
    administrators: f.administrators || 0,
    // Keeping these fields mocked/placeholder until real data ingestion is implemented
    apiActivity: f.api_activity || 'N/A',
    lastSync: f.last_sync ? new Date(f.last_sync).toLocaleString() : 'N/A',
  }));
}

export async function updateFacilityStatus(id: number, status: FacilityStatus): Promise<Facility> {
  const { data, error } = await supabase
    .from('facilities')
    .update({ 
      status,
      // Mocking compliance/admins update for verified status, as per previous mock logic
      compliance: status === 'verified' ? 70 : 0,
      administrators: status === 'verified' ? 1 : 0,
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error("Error updating facility status:", error);
    throw new Error(`Failed to update facility status: ${error.message}`);
  }
  
  // Map Supabase data structure back to Facility interface
  return {
    id: data.id,
    name: data.name,
    lga: data.lga || 'N/A',
    type: data.type || 'N/A',
    status: data.status as FacilityStatus,
    compliance: data.compliance || 0,
    administrators: data.administrators || 0,
    apiActivity: data.api_activity || 'N/A',
    lastSync: data.last_sync ? new Date(data.last_sync).toLocaleString() : 'N/A',
  };
}

export async function signUpMoH(email: string, password: string, firstName: string, lastName: string): Promise<void> {
  // 1. Create user in Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
      },
    },
  });

  if (authError) {
    throw new Error(authError.message);
  }

  const userId = authData.user?.id;

  if (!userId) {
    throw new Error("User creation failed, no user ID returned.");
  }

  // 2. Update the profile table to assign the MoH role immediately
  // Note: The handle_new_user trigger runs first, creating a basic profile.
  const { error: profileError } = await supabase
    .from('profiles')
    .update({ role: 'MoH', first_name: firstName, last_name: lastName })
    .eq('id', userId);

  if (profileError) {
    // If profile update fails, we should ideally log this and potentially delete the auth user.
    console.error("Failed to set MoH role:", profileError);
    throw new Error("User created, but failed to assign MoH role. Please contact support.");
  }
}

export async function updateUserProfile(userId: string, firstName: string, lastName: string): Promise<void> {
  const { error } = await supabase
    .from('profiles')
    .update({ first_name: firstName, last_name: lastName, updated_at: new Date().toISOString() })
    .eq('id', userId);

  if (error) {
    console.error("Error updating profile:", error);
    throw new Error(`Failed to update profile: ${error.message}`);
  }
}

// --- Settings API Functions (New) ---

export interface FacilityIntegrationSettings {
  emrSystem: string;
  fhirEndpoint: string;
}

/**
 * Updates integration settings for a facility.
 * NOTE: This currently mocks updating the facility table with new fields.
 */
export async function updateFacilityIntegrationSettings(facilityId: number, settings: FacilityIntegrationSettings): Promise<void> {
  // In a real scenario, we might update a dedicated 'integration_settings' table.
  // For simplicity, we mock the update here.
  console.log(`[MOCK API] Updating integration settings for Facility ID ${facilityId}:`, settings);
  
  // Simulate a successful update
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // If we were to update the facilities table:
  // const { error } = await supabase
  //   .from('facilities')
  //   .update({ emr_system: settings.emrSystem, fhir_endpoint: settings.fhirEndpoint })
  //   .eq('id', facilityId);
  
  // if (error) throw new Error(error.message);
}

export interface MoHSystemSettings {
  minCompleteness: number;
  errorAlertLimit: number;
  defaultConsentExpiry: number;
}

/**
 * Updates system-wide settings (MoH role).
 * NOTE: This requires a dedicated 'system_settings' table, which we will mock for now.
 */
export async function updateMoHSystemSettings(settings: MoHSystemSettings): Promise<void> {
  console.log(`[MOCK API] Updating MoH System Settings:`, settings);
  
  // Simulate a successful update
  await new Promise(resolve => setTimeout(resolve, 500));
}


// --- Registration Request Functions ---

export async function submitStateRegistration(data: StateRegistrationData): Promise<void> {
  try {
    const { error } = await supabase
      .from('registration_requests')
      .insert({
        type: 'state' as any,
        data: data,
      });

    if (error) {
      console.warn("Direct State request failed, falling back to mock persistence:", error);
      const { error: fallbackError } = await supabase
        .from('registration_requests')
        .insert({
          type: 'facility',
          data: { ...data, isStateRequest: true, facilityName: `${data.stateName} HIE Node` },
        });
      
      if (fallbackError) {
        throw fallbackError;
      }
    }
  } catch (err) {
    console.error("Error submitting state registration:", err);
    throw new Error("Failed to submit state registration request.");
  }
}

export async function submitFacilityRegistration(data: FacilityRegistrationData): Promise<void> {
  const { error } = await supabase
    .from('registration_requests')
    .insert({
      type: 'facility',
      data: data,
    });

  if (error) {
    console.error("Error submitting facility registration:", error);
    throw new Error("Failed to submit registration request.");
  }
}

export async function submitDeveloperRegistration(data: DeveloperRegistrationData): Promise<void> {
  const { error } = await supabase
    .from('registration_requests')
    .insert({
      type: 'developer',
      data: data,
    });

  if (error) {
    console.error("Error submitting developer registration:", error);
    throw new Error("Failed to submit registration request.");
  }
}

export async function fetchRegistrationRequests(): Promise<RegistrationRequest[]> {
  const { data, error } = await supabase
    .from('registration_requests')
    .select('*')
    .order('submitted_at', { ascending: false });

  if (error) {
    console.error("Error fetching registration requests:", error);
    throw new Error("Failed to fetch registration requests.");
  }
  
  return data.map(req => ({
    id: req.id,
    type: req.type as 'facility' | 'developer',
    data: req.data,
    status: req.status as 'pending' | 'approved' | 'rejected',
    submitted_at: new Date(req.submitted_at).toLocaleString(),
  }));
}

export async function rejectRegistrationRequest(requestId: string): Promise<void> {
  const { data: sessionData } = await supabase.auth.getSession();
  const userId = sessionData.session?.user.id;

  const { error } = await supabase
    .from('registration_requests')
    .update({ status: 'rejected', approved_by: userId })
    .eq('id', requestId);

  if (error) {
    console.error("Error rejecting request:", error);
    throw new Error("Failed to reject registration request.");
  }
}

// New function to handle user creation and final approval steps
export async function createApprovedUser({
  requestId,
  requestType,
  requestData,
  email,
  password,
  name,
  role,
}: {
  requestId: string;
  requestType: 'facility' | 'developer';
  requestData: any;
  email: string;
  password: string;
  name: string;
  role: 'FacilityAdmin' | 'Developer';
}): Promise<void> {
  
  const { data: sessionData } = await supabase.auth.getSession();
  const mohUserId = sessionData.session?.user.id;

  if (!mohUserId) {
    throw new Error("User must be authenticated to approve requests.");
  }

  // 1. Invoke the Edge Function for secure administrative actions
  const { data, error } = await supabase.functions.invoke('approve-request', {
    body: JSON.stringify({
      requestId,
      requestType,
      requestData,
      email,
      password,
      name,
      role,
      mohUserId,
    }),
  });

  if (error) {
    console.error("Edge Function invocation failed:", error);
    throw new Error(`Approval failed: ${error.message}`);
  }
  
  if (data && data.error) {
    console.error("Edge Function returned error:", data.error);
    throw new Error(`Approval failed: ${data.error}`);
  }

  // 2. Simulate sending the welcome email with the temporary password
  // NOTE: The client-side hook will handle the success notification and password display.
  console.log(`[EMAIL SIMULATION] Sent welcome email to ${email} with temporary password: ${password}`);
}


// --- Command Center API Functions ---

export interface CommandCenterMetrics {
  connectedFacilities: number;
  totalEvents24h: number;
  successRate: number; // 0 to 100
  activeIntegrations: number;
  eventsPerMinute: number;
}

/**
 * Fetches aggregated metrics for the Command Center dashboard.
 */
export async function fetchCommandCenterMetrics(): Promise<CommandCenterMetrics> {
  // 1. Connected Facilities (Verified)
  const { count: connectedFacilitiesCount, error: facilitiesError } = await supabase
    .from('facilities')
    .select('id', { count: 'exact', head: true })
    .eq('status', 'verified');

  if (facilitiesError) throw new Error(`Failed to fetch facility count: ${facilitiesError.message}`);

  // 2. Audit Logs (24h metrics)
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  const { count: totalLogsCount, error: totalLogsError } = await supabase
    .from('audit_logs')
    .select('id', { count: 'exact', head: true })
    .gte('timestamp', twentyFourHoursAgo);

  if (totalLogsError) throw new Error(`Failed to fetch total logs: ${totalLogsError.message}`);

  const { count: successLogsCount, error: successLogsError } = await supabase
    .from('audit_logs')
    .select('id', { count: 'exact', head: true })
    .gte('timestamp', twentyFourHoursAgo)
    .eq('status', 'success');

  if (successLogsError) throw new Error(`Failed to fetch success logs: ${successLogsError.message}`);

  const totalEvents = totalLogsCount || 0;
  const successEvents = successLogsCount || 0;
  const successRate = totalEvents > 0 ? (successEvents / totalEvents) * 100 : 100;
  
  // Mocking change metrics for now
  const eventsPerMinute = Math.round(totalEvents / 1440); // 1440 minutes in 24 hours

  return {
    connectedFacilities: connectedFacilitiesCount || 0,
    totalEvents24h: totalEvents,
    successRate: parseFloat(successRate.toFixed(1)),
    activeIntegrations: connectedFacilitiesCount || 0, // Assuming 1 integration per verified facility
    eventsPerMinute: eventsPerMinute,
  };
}

export interface LgaDistribution {
  name: string;
  facilities: number;
  active: number;
}

/**
 * Fetches facility distribution grouped by LGA.
 */
export async function fetchLgaDistribution(): Promise<LgaDistribution[]> {
  const { data, error } = await supabase.rpc('get_lga_distribution');

  if (error) {
    console.error("Error fetching LGA distribution:", error);
    throw new Error("Failed to fetch LGA distribution data.");
  }

  return (data || []).map((row: any) => ({
    name: row.name,
    facilities: row.facilities || 0,
    active: row.active || 0,
  }));
}

export interface EventStreamData {
  time: string;
  events: number;
}

/**
 * Fetches time-series data for FHIR events (hourly buckets).
 * NOTE: This requires a PostgreSQL function (e.g., time_bucket) for true efficiency.
 * We will mock the time series data for now, but use real counts.
 */
export async function fetchEventStreamData(): Promise<EventStreamData[]> {
  const { data, error } = await supabase.rpc('get_event_stream_data');

  if (error) {
    console.error("Error fetching Event Stream Data:", error);
    // Fallback to mock data if RPC fails or is not yet configured on the DB side
    return [
      { time: "00:00", events: 245 },
      { time: "04:00", events: 189 },
      { time: "08:00", events: 467 },
      { time: "12:00", events: 523 },
      { time: "16:00", events: 489 },
      { time: "20:00", events: 356 },
      { time: "23:59", events: 298 },
    ];
  }

  return (data || []).map((row: any) => ({
    time: row.bucket_time || row.time,
    events: row.events || 0,
  }));
}


// Placeholder for other data types (Audit Logs, FHIR Events)
export interface AuditLog {
  id: number;
  timestamp: string;
  user: string;
  action: string;
  resource: string;
  ip: string;
  status: "success" | "failed";
  facilityName?: string;
  details?: any;
}

export interface AuditMetrics {
  total: number;
  successful: number;
  failed: number;
  uniqueUsers: number;
}

/**
 * Fetches aggregated metrics for the Audit Logs page (Total, Success, Failed, Unique Users).
 * RLS handles filtering by role/facility.
 */
export async function fetchAuditMetrics(): Promise<AuditMetrics> {
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  
  // 1. Total Logs (RLS applies automatically)
  const { count: totalCount, error: totalError } = await supabase
    .from('audit_logs')
    .select('id', { count: 'exact', head: true })
    .gte('timestamp', twentyFourHoursAgo);

  if (totalError) throw new Error(`Failed to fetch total logs: ${totalError.message}`);

  // 2. Successful Logs
  const { count: successCount, error: successError } = await supabase
    .from('audit_logs')
    .select('id', { count: 'exact', head: true })
    .gte('timestamp', twentyFourHoursAgo)
    .eq('status', 'success');

  if (successError) throw new Error(`Failed to fetch success logs: ${successError.message}`);

  // 3. Failed Logs
  const { count: failedCount, error: failedError } = await supabase
    .from('audit_logs')
    .select('id', { count: 'exact', head: true })
    .gte('timestamp', twentyFourHoursAgo)
    .eq('status', 'failed');

  if (failedError) throw new Error(`Failed to fetch failed logs: ${failedError.message}`);
  
  // 4. Unique Users (Requires a separate query or RPC for efficiency, mocking for now)
  // In a real scenario, we would use: SELECT count(DISTINCT user_email) FROM audit_logs WHERE timestamp >= '...'
  const uniqueUsers = Math.min(totalCount || 0, 248); // Mocking based on total count

  return {
    total: totalCount || 0,
    successful: successCount || 0,
    failed: failedCount || 0,
    uniqueUsers: uniqueUsers,
  };
}


/**
 * Fetches audit logs from Supabase. RLS handles filtering by role/facility.
 * @param filterStatus Optional status filter ('failed' for error feed).
 */
export async function fetchAuditLogs(role: string, facilityName?: string, filterStatus?: 'failed' | 'success'): Promise<AuditLog[]> {
    let query = supabase
        .from('audit_logs')
        .select('id, timestamp, user_email, action, resource_type, resource_id, ip_address, status, facility:facilities(name), details')
        .order('timestamp', { ascending: false })
        .limit(filterStatus ? 10 : 100); // Limit error feed to 10, general logs to 100

    if (filterStatus) {
        query = query.eq('status', filterStatus);
    }

    const { data, error } = await query;

    if (error) {
        console.error("Error fetching audit logs:", error);
        throw new Error("Failed to fetch audit logs.");
    }
    
    // Map Supabase data to AuditLog interface
    return data.map(log => {
        const facilityData = log.facility as any;
        const facilityName = Array.isArray(facilityData) ? facilityData[0]?.name : facilityData?.name;
        
        return {
            id: log.id,
            timestamp: new Date(log.timestamp).toLocaleString(),
            user: log.user_email || 'System/API',
            action: log.action || 'N/A',
            resource: log.resource_type && log.resource_id ? `${log.resource_type}/${log.resource_id}` : log.resource_type || 'N/A',
            ip: log.ip_address || 'N/A',
            status: log.status === 'success' ? 'success' : 'failed',
            facilityName: facilityName,
            details: log.details,
        };
    });
}

export interface FhirEvent {
    id: number;
    resource: string;
    operation: string;
    facility: string;
    status: "success" | "failed" | "warning";
    timestamp: string;
}

/**
 * Fetches FHIR events by querying audit_logs where resource_type is set.
 */
export async function fetchFhirEvents(): Promise<FhirEvent[]> {
    const { data, error } = await supabase
        .from('audit_logs')
        .select('id, timestamp, action, resource_type, status, facility:facilities(name), details')
        .not('resource_type', 'is', null)
        .order('timestamp', { ascending: false })
        .limit(50);

    if (error) {
        console.error("Error fetching FHIR events:", error);
        throw new Error("Failed to fetch FHIR events.");
    }
    
    return data.map(log => {
        const facilityData = log.facility as any;
        const facilityName = Array.isArray(facilityData) ? facilityData[0]?.name : facilityData?.name;
        
        // Determine status: If status is 'failed', it's failed. If details contain 'warning', it's warning. Otherwise success.
        let status: "success" | "failed" | "warning" = log.status === 'failed' ? 'failed' : 'success';
        if (log.details && JSON.stringify(log.details).toLowerCase().includes('warning')) {
            status = 'warning';
        }

        return {
            id: log.id,
            resource: log.resource_type || 'N/A',
            operation: log.action || 'N/A',
            facility: facilityName || 'N/A',
            status: status,
            timestamp: new Date(log.timestamp).toLocaleString(),
        };
    });
}

export function getMockMessageDetails(id: number) {
    // In a real scenario, we would fetch the specific audit log by ID
    // and extract rawPayload and fhirOutput from a dedicated storage or the details column.
    
    // Mocking the data structure based on audit_logs details
    const rawPayload = `MSH|^~\&|EMR|GHILORIN|HKIT|KWARA|20241123142345||ADT^A01|MSG0001|P|2.5
PID|1||${id}^^^MRN||DOE^JOHN^A||19800101|M|||...`;

    const fhirOutput = JSON.stringify({
        resourceType: "Patient",
        id: id,
        meta: { lastUpdated: new Date().toISOString() },
        status: 'active',
        // ... more FHIR data
    }, null, 2);

    const validationErrors = id % 3 === 0 
        ? ["Missing required field: Patient.identifier[0].value", "Invalid code system for Encounter.class"]
        : id % 5 === 0
        ? ["Coding system not recognized (SNOMED CT expected)"]
        : [];

    return {
        id: id,
        status: id % 3 === 0 ? 'failed' : id % 5 === 0 ? 'warning' : 'success',
        resource: "Patient",
        rawPayload: rawPayload,
        fhirOutput: fhirOutput,
        validationErrors: validationErrors,
    };
}


// --- Consent API Functions ---

export interface ConsentRecord {
  patientId: string;
  scope: string;
  grantedTo: string;
  expiry: string;
  status: "active" | "revoked";
}

/**
 * Fetches consent records from Supabase. RLS handles filtering by role/facility.
 */
export async function fetchConsentRecords(): Promise<ConsentRecord[]> {
  const { data, error } = await supabase
    .from('consent_records')
    .select('patient_id, scope, granted_to, expiry, status, created_at, facility:facilities(name)')
    .order('created_at', { ascending: false })
    .limit(50);

  if (error) {
    console.error("Error fetching consent records:", error);
    throw new Error("Failed to fetch consent records.");
  }
  
  return data.map(record => ({
    patientId: record.patient_id,
    scope: record.scope || 'N/A',
    grantedTo: (record.facility as any)?.name || record.granted_to || 'N/A',
    expiry: record.expiry ? new Date(record.expiry).toLocaleDateString() : 'N/A',
    status: record.status === 'active' ? 'active' : 'revoked',
  }));
}

export async function revokeConsent(patientId: string): Promise<ConsentRecord> {
  const { data, error } = await supabase
    .from('consent_records')
    .update({ status: 'revoked' })
    .eq('patient_id', patientId)
    .eq('status', 'active') // Only revoke active consents
    .select('patient_id, scope, granted_to, expiry, status, facility:facilities(name)')
    .single();

  if (error) {
    console.error("Error revoking consent:", error);
    throw new Error(`Failed to revoke consent: ${error.message}`);
  }
  
  // The select statement returns an array of objects for the joined table, 
  // but since we select 'facility:facilities(name)', it's an object { name: string } or null.
  const facilityData = data.facility as any;
  const facilityName = Array.isArray(facilityData) ? facilityData[0]?.name : facilityData?.name;

  return {
    patientId: data.patient_id,
    scope: data.scope || 'N/A',
    grantedTo: facilityName || data.granted_to || 'N/A',
    expiry: data.expiry ? new Date(data.expiry).toLocaleDateString() : 'N/A',
    status: data.status as "active" | "revoked",
  };
}

// --- Master Patient Index API Functions ---

export interface MpiRecord {
  id: string;
  stateHealthId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  facility: string;
  verified: boolean;
}

/**
 * Fetches MPI records from Supabase. RLS handles filtering by role/facility.
 */
export async function fetchMpiRecords(): Promise<MpiRecord[]> {
  const { data, error } = await supabase
    .from('master_patient_index')
    .select('id, state_health_id, first_name, last_name, date_of_birth, gender, facility:facilities(name)')
    .limit(50);

  if (error) {
    console.error("Error fetching MPI records:", error);
    throw new Error("Failed to fetch MPI records.");
  }
  
  return data.map(record => {
    // Handle joined facility data which might be an array or object depending on Supabase version/query
    const facilityData = record.facility as any;
    const facilityName = Array.isArray(facilityData) ? facilityData[0]?.name : facilityData?.name;

    return {
      id: record.id,
      stateHealthId: record.state_health_id,
      firstName: record.first_name,
      lastName: record.last_name,
      dateOfBirth: record.date_of_birth || 'N/A',
      gender: record.gender || 'N/A',
      facility: facilityName || 'N/A',
      // Mocking verification status for now
      verified: true, 
    };
  });
}

/**
 * Probabilistic matching RPC to find existing patients in the MPI.
 */
export async function findPatientMatch(
  firstName: string,
  lastName: string,
  dob: string,
  gender: string
): Promise<{ id: string, stateHealthId: string, matchScore: number }[]> {
  const { data, error } = await supabase.rpc('find_patient_match', {
    p_first_name: firstName,
    p_last_name: lastName,
    p_dob: dob,
    p_gender: gender
  });

  if (error) {
    console.error("Error finding patient match via RPC:", error);
    throw new Error("Failed to find patient match.");
  }

  return (data || []).map((row: any) => ({
    id: row.id,
    stateHealthId: row.state_health_id,
    matchScore: row.match_score,
  }));
}


// --- Data Quality API Functions ---

export interface FacilityScore {
  name: string;
  score: number;
  trend: "up" | "down" | "neutral";
  change: string;
}

export interface HeatmapRow {
  facility: string;
  Patient: number;
  Encounter: number;
  Observation: number;
  Medication: number;
}

export interface CompletenessTrend {
  day: string;
  score: number;
}

export interface ErrorDistribution {
  name: string;
  value: number;
  color: string;
}

/**
 * Fetches data quality scores for all facilities (MoH) or a specific facility (FacilityAdmin).
 */
export async function fetchFacilityScores(role: UserRole, facilityName?: string): Promise<FacilityScore[]> {
  let query = supabase
    .from('facilities')
    .select('name, compliance, status')
    .eq('status', 'verified'); // Only show verified facilities for scoring

  if (role === 'FacilityAdmin' && facilityName) {
    query = query.eq('name', facilityName);
  } else if (role !== 'MoH') {
    return [];
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching facility scores:", error);
    throw new Error("Failed to fetch facility scores.");
  }
  
  // NOTE: Trend and change are still mocked as they require historical data
  return data.map(f => ({
    name: f.name,
    score: f.compliance || 0,
    trend: f.compliance > 80 ? "up" : "down", // Simple mock trend logic
    change: f.compliance > 80 ? "+1%" : "-1%", // Simple mock change logic
  }));
}

/**
 * Fetches data quality heatmap data (MoH only).
 */
export async function fetchDataQualityHeatmap(): Promise<HeatmapRow[]> {
  // Mock data as the facility_resource_compliance table does not exist
  return [
    { facility: "Kwara General Hospital", Patient: 95, Encounter: 80, Observation: 75, Medication: 60 },
    { facility: "Sobi Specialist", Patient: 90, Encounter: 85, Observation: 70, Medication: 55 },
    { facility: "Unilorin Teaching Hospital", Patient: 98, Encounter: 92, Observation: 88, Medication: 85 }
  ];
}

/**
 * Fetches completeness trend data. (MOCK)
 */
export async function fetchCompletenessTrend(facilityName?: string): Promise<CompletenessTrend[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    // Mock data remains the same regardless of facility for simplicity
    return [
        { day: "Day 1", score: 82 },
        { day: "Day 2", score: 84 },
        { day: "Day 3", score: 85 },
        { day: "Day 4", score: 87 },
        { day: "Day 5", score: 87.3 },
        { day: "Day 6", score: 88 },
        { day: "Day 7", score: 89 },
    ];
}

/**
 * Fetches error distribution data. (MOCK)
 */
export async function fetchErrorDistribution(facilityName?: string): Promise<ErrorDistribution[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    // Mock data remains the same regardless of facility for simplicity
    return [
        { name: "Missing Identifiers", value: 450, color: "hsl(var(--chart-1))" },
        { name: "Invalid Date Formats", value: 320, color: "hsl(var(--chart-2))" },
        { name: "Coding System Errors", value: 210, color: "hsl(var(--chart-3))" },
        { name: "FHIR Structure Violations", value: 150, color: "hsl(var(--chart-4))" },
    ];
}

/**
 * Fetches the count of failed audit logs (validation errors) in the last 24 hours.
 * RLS ensures Facility Admins only see their facility's errors.
 */
export async function fetchValidationErrorsCount(facilityName?: string): Promise<number> {
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  
  // RLS handles filtering by user/facility ID. We only need to filter by time and status.
  const { count, error } = await supabase
    .from('audit_logs')
    .select('id', { count: 'exact', head: true })
    .gte('timestamp', twentyFourHoursAgo)
    .eq('status', 'failed');

  if (error) {
    console.error("Error fetching validation error count:", error);
    throw new Error(`Failed to fetch validation error count: ${error.message}`);
  }
  
  return count || 0;
}