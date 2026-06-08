import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Code2, Key, Network, Activity, TrendingUp, ShieldCheck } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { Button } from "@/components/ui/button";

const apiUsageData = [
  { resource: "Patient", calls: 1200 },
  { resource: "Encounter", calls: 850 },
  { resource: "Observation", calls: 2100 },
  { resource: "Condition", calls: 450 },
];

const DeveloperDashboard = () => {
  const { user } = useAuth();
  const userName = user?.name || "Developer";
  const [env, setEnv] = useState<"sandbox" | "production">("sandbox");

  useEffect(() => {
    document.title = `${userName}'s Developer Dashboard | Hkit Portal`;
  }, [userName]);

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
      
      {/* Background Blurs */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-[10%] left-[10%] w-[35%] h-[30%] bg-[#86efac]/10 blur-[130px] rounded-full opacity-60" />
      </div>

      {/* Header */}
      <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-zinc-200/40">
        <div>
          <div className="flex items-center flex-wrap gap-2.5">
            <h1 className="text-2xl font-extrabold text-zinc-900 tracking-tight">{userName}'s Dashboard</h1>
            <span className="inline-flex items-center gap-1 text-[9px] font-mono text-primary bg-primary/10 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border border-primary/20">
              <ShieldCheck className="w-3 h-3" />
              Standalone HIE Node
            </span>
          </div>
          <p className="text-xs text-zinc-500 font-mono mt-1 uppercase tracking-wider">
            Developer HIE Node Portal | API usage & credentials
          </p>
        </div>

        {/* Environment toggle */}
        <div className="flex items-center gap-1 p-1 bg-white/50 border border-zinc-200/60 rounded-lg shadow-[0_2px_8px_rgba(4,48,24,0.01)] backdrop-blur-sm">
          <button
            onClick={() => setEnv("sandbox")}
            className={`px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider rounded font-bold transition-all ${
              env === "sandbox" ? "bg-primary text-white" : "text-zinc-500 hover:text-zinc-800"
            }`}
          >
            Sandbox HIE
          </button>
          <button
            onClick={() => setEnv("production")}
            className={`px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider rounded font-bold transition-all ${
              env === "production" ? "bg-primary text-white" : "text-zinc-500 hover:text-zinc-800"
            }`}
          >
            Production HIE
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {renderMetricCard(
          "Total API Calls (24h)",
          env === "sandbox" ? "4,600" : "0",
          Activity,
          "+15% sandbox request growth",
          "positive"
        )}
        {renderMetricCard(
          "Active API Keys",
          "2 Keys",
          Key,
          "Production & Sandbox Nodes",
          "neutral"
        )}
        {renderMetricCard(
          "Webhook Deliveries",
          "99.9%",
          Network,
          "0 failed webhook blocks",
          "positive"
        )}
        {renderMetricCard(
          "Average Latency",
          "85ms",
          TrendingUp,
          "mTLS gateway stable",
          "neutral"
        )}
      </div>

      {/* Charts & Actions */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Bar chart */}
        <Card className="glass-card card-3d p-6 border border-white/60 rounded-xl lg:col-span-2">
          <h3 className="text-sm font-bold text-zinc-900 font-mono uppercase tracking-wider mb-4 flex items-center justify-between">
            <span>API Usage by FHIR Resource (24h)</span>
            <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded font-bold">RESOURCE LOGS</span>
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={apiUsageData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(4, 48, 24, 0.05)" />
              <XAxis dataKey="resource" stroke="hsl(var(--muted-foreground))" className="font-mono text-[9px]" />
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
              <Bar dataKey="calls" fill="rgba(16, 185, 129, 0.2)" stroke="hsl(var(--primary))" strokeWidth={1.5} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Quick Actions */}
        <Card className="glass-card card-3d p-6 border border-white/60 rounded-xl flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-zinc-900 font-mono uppercase tracking-wider mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button className="w-full justify-start text-xs border-emerald-100/50 bg-white/40 hover:bg-white text-zinc-800" variant="outline">
                <Key className="w-4 h-4 mr-2 text-primary" />
                Generate Sandbox Key
              </Button>
              <Button className="w-full justify-start text-xs border-emerald-100/50 bg-white/40 hover:bg-white text-zinc-800" variant="outline">
                <Code2 className="w-4 h-4 mr-2 text-primary" />
                Open Sandbox Terminal
              </Button>
              <Button className="w-full justify-start text-xs border-emerald-100/50 bg-white/40 hover:bg-white text-zinc-800" variant="outline">
                <Network className="w-4 h-4 mr-2 text-primary" />
                Configure Webhook Node
              </Button>
            </div>
          </div>
          <Button className="w-full mt-6 bg-primary text-white hover:bg-primary/95 shadow-[0_4px_12px_rgba(16,185,129,0.2)]">
            Open Full Portal Docs
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default DeveloperDashboard;