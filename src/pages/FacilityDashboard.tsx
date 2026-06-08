import React, { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { CheckCircle2, AlertCircle, Database, Activity, TrendingUp, ShieldCheck } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const activityData = [
  { hour: "08:00", submissions: 120 },
  { hour: "10:00", submissions: 155 },
  { hour: "12:00", submissions: 180 },
  { hour: "14:00", submissions: 140 },
  { hour: "16:00", submissions: 165 },
  { hour: "18:00", submissions: 130 },
];

const FacilityDashboard = () => {
  const { user } = useAuth();
  const facilityName = user?.facilityName || "General Hospital Ilorin";
  // Dynamically mock the parent State HIE node based on user profile or default to Kwara HIE
  const parentStateNode = user?.stateHieNode || "Kwara State HIE";

  useEffect(() => {
    document.title = `${facilityName} Dashboard | Hkit Portal`;
  }, [facilityName]);

  const renderMetricCard = (title: string, value: string | number, icon: any, change?: string, changeType?: "positive" | "negative" | "neutral") => {
    return (
      <div className="glass-card card-3d p-6 rounded-xl border border-white/60 transition-all flex justify-between items-start">
        <div>
          <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider font-bold">{title}</span>
          <h3 className="text-2xl font-extrabold text-zinc-950 mt-1">{value}</h3>
          {change && (
            <span className={`text-[10px] font-mono mt-2 block font-semibold ${
              changeType === "positive" ? "text-emerald-600" : changeType === "negative" ? "text-rose-600" : "text-zinc-500"
            }`}>{change}</span>
          )}
        </div>
        <div className="p-2 bg-primary/10 rounded-lg text-primary">
          {React.createElement(icon, { className: "w-5 h-5" })}
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6 relative selection:bg-primary/20">
      
      {/* Dynamic Background Blurs */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] right-[10%] w-[40%] h-[30%] bg-[#86efac]/10 blur-[130px] rounded-full opacity-60" />
      </div>

      {/* Header showing hierarchy node */}
      <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-zinc-200/40">
        <div>
          <div className="flex items-center flex-wrap gap-2.5">
            <h1 className="text-2xl font-extrabold text-zinc-900 tracking-tight">{facilityName}</h1>
            <span className="inline-flex items-center gap-1 text-[9px] font-mono text-primary bg-primary/10 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border border-primary/20">
              <ShieldCheck className="w-3 h-3" />
              parent: {parentStateNode}
            </span>
          </div>
          <p className="text-xs text-zinc-500 font-mono mt-1 uppercase tracking-wider">
            Clinical HIE Node Dashboard | Interoperability & Quality Metrics
          </p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {renderMetricCard(
          "Data Quality Score",
          "92%",
          Database,
          "Exchange Target: 90%",
          "positive"
        )}
        {renderMetricCard(
          "API Success Rate (24h)",
          "99.8%",
          CheckCircle2,
          "Secure mTLS Connection",
          "positive"
        )}
        {renderMetricCard(
          "Failed Submissions (24h)",
          "4",
          AlertCircle,
          "Last block mismatch: 1h ago",
          "negative"
        )}
        {renderMetricCard(
          "FHIR Events Sent",
          "2,145",
          Activity,
          "+5% volume load growth",
          "positive"
        )}
      </div>

      {/* Visual Analytics */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Line Chart */}
        <Card className="glass-card card-3d p-6 border border-white/60 rounded-xl lg:col-span-2">
          <h3 className="text-sm font-bold text-zinc-900 font-mono uppercase tracking-wider mb-4 flex items-center justify-between">
            <span>FHIR Submission Activity (Today)</span>
            <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded font-bold">NODE SEND FEED</span>
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(4, 48, 24, 0.05)" />
              <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" className="font-mono text-[9px]" />
              <YAxis stroke="hsl(var(--muted-foreground))" className="font-mono text-[9px]" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  border: "1px solid rgba(16, 185, 129, 0.2)",
                  borderRadius: "10px",
                  fontFamily: "monospace",
                  fontSize: "10px"
                }}
              />
              <Line
                type="monotone"
                dataKey="submissions"
                stroke="hsl(var(--primary))"
                strokeWidth={2.5}
                dot={{ r: 4, fill: "hsl(var(--primary))", strokeWidth: 1.5 }}
                name="FHIR Resources"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Quality Trends */}
        <Card className="glass-card card-3d p-6 border border-white/60 rounded-xl flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-zinc-900 font-mono uppercase tracking-wider mb-4">Data Quality Trends</h3>
            <div className="space-y-4">
              
              <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100/40 flex justify-between items-center shadow-[2px_2px_8px_rgba(4,48,24,0.01)]">
                <div>
                  <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider font-bold">Completeness</p>
                  <span className="text-2xl font-extrabold text-emerald-800">95%</span>
                </div>
                <TrendingUp className="w-5 h-5 text-emerald-600" />
              </div>

              <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-100/40 flex justify-between items-center shadow-[2px_2px_8px_rgba(4,48,24,0.01)]">
                <div>
                  <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider font-bold">Timeliness</p>
                  <span className="text-2xl font-extrabold text-amber-800">88%</span>
                </div>
                <TrendingUp className="w-5 h-5 text-amber-600" />
              </div>

              <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 flex justify-between items-center shadow-[2px_2px_8px_rgba(4,48,24,0.01)]">
                <div>
                  <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider font-bold">Validation Rate</p>
                  <span className="text-2xl font-extrabold text-primary">99%</span>
                </div>
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>

            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default FacilityDashboard;