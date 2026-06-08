// @ts-ignore
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

/**
 * A basic generic HL7 v2 to FHIR R4 Transformer Edge Function.
 * It takes in a raw HL7 message and attempts to extract Patient information.
 */

serve(async (req: Request) => {
  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  };

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const hl7Message: string = body.message;

    if (!hl7Message) {
      throw new Error("No HL7 message provided");
    }

    // A very naive HL7 parser taking segments
    const segments = hl7Message.split('\n').map(segment => segment.split('|'));
    
    // Find PID segment
    const pidSegment = segments.find(s => s[0] === 'PID');

    if (!pidSegment) {
        throw new Error("Missing PID segment for patient extraction");
    }

    // Extract Basic Demographics
    // HL7 format: PID|1||MRN||Last^First^Middle||DOB|Gender
    const mrn = pidSegment[3] ? pidSegment[3].split('^')[0] : '';
    const nameParts = pidSegment[5] ? pidSegment[5].split('^') : ['', ''];
    const lastName = nameParts[0];
    const firstName = nameParts[1] || '';
    const dobString = pidSegment[7] || ''; // YYYYMMDD
    const gender = pidSegment[8] || 'unknown';

    // Format DOB to YYYY-MM-DD
    let formattedDob = dobString;
    if (dobString.length >= 8) {
        formattedDob = `${dobString.substring(0,4)}-${dobString.substring(4,6)}-${dobString.substring(6,8)}`;
    }

    // Convert to FHIR format
    const fhirResource = {
        resourceType: "Patient",
        id: crypto.randomUUID(),
        identifier: [
            {
                use: "usual",
                type: {
                    coding: [
                        {
                            system: "http://terminology.hl7.org/CodeSystem/v2-0203",
                            code: "MR",
                            display: "Medical record number"
                        }
                    ],
                    text: "Medical record number"
                },
                system: "http://hospital.smarthealthit.org",
                value: mrn
            }
        ],
        active: true,
        name: [
            {
                use: "official",
                family: lastName,
                given: [firstName]
            }
        ],
        gender: gender.toLowerCase() === 'm' ? 'male' : gender.toLowerCase() === 'f' ? 'female' : 'unknown',
        birthDate: formattedDob
    };

    return new Response(
      JSON.stringify({
        success: true,
        fhirResource,
        message: "Successfully transformed HL7 PID segment into FHIR Patient resource"
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});
