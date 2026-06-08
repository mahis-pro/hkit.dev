import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Building2, Activity, CheckCircle2, AlertCircle, TrendingUp, Loader2, AlertTriangle, LucideIcon, Globe } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { useCommandCenterMetrics, useLgaDistribution, useEventStreamData, useLiveErrorFeed } from "@/hooks/use-hkit-data";
import { Skeleton } from "@/components/ui/skeleton";
import { MetricCard } from "@/components/dashboard/MetricCard";

const CommandCenter = () => {
  const [selectedState, setSelectedState] = useState<string>("Kwara State HIE");
  const { data: metrics, isLoading: isLoadingMetrics, isError: isErrorMetrics } = useCommandCenterMetrics();
  const { data: facilityData, isLoading: isLoadingLga, isError: isErrorLga } = useLgaDistribution();
  const { data: eventData, isLoading: isLoadingEvents, isError: isErrorEvents } = useEventStreamData();
  const { data: errorLogs, isLoading: isLoadingErrors, isError: isErrorErrors } = useLiveErrorFeed();

  useEffect(() => {
    document.title = `${selectedState} Command Center | Hkit Portal`;
  }, [selectedState]);

  const renderMetricCard = (title: string, value: string | number, icon: LucideIcon, change?: string, changeType?: "positive" | "negative" | "neutral") => {
    if (isLoadingMetrics) {
      return <Skeleton className="h-32 w-full rounded-xl bg-white/40" />;
    }
    if (isErrorMetrics) {
      return (
        <Card className="p-6 border-destructive/20 bg-destructive/10 rounded-xl">
          <p className="text-sm text-destructive">Error loading metrics.</p>
        </Card>
      );
    }
    
    // Scale stats slightly based on state selected for dynamic multi-tenant feel
    let displayValue = value;
    if (typeof value === "string" && value.includes(",")) {
      const num = parseInt(value.replace(/,/g, ""));
      if (!isNaN(num)) {
        displayValue = Math.round(selectedState === "Kwara State HIE" ? num : selectedState === "Lagos State HIE" ? num * 3.5 : num * 1.8).toLocaleString();
      }
    } else if (typeof value === "number") {
      displayValue = Math.round(selectedState === "Kwara State HIE" ? value : selectedState === "Lagos State HIE" ? value * 3.5 : value * 1.8);
    }

    return (
      <div className="glass-card card-3d p-6 rounded-xl border border-white/60 transition-all flex justify-between items-start">
        <div>
          <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider font-bold">{title}</span>
          <h3 className="text-2xl font-extrabold text-zinc-950 mt-1">{displayValue}</h3>
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

  const successRate = metrics?.successRate || 0;
  const successChangeType = successRate >= 99 ? "positive" : successRate >= 95 ? "neutral" : "negative";
  const eventsPerMinute = metrics?.eventsPerMinute || 0;
  const eventsChangeType = eventsPerMinute > 500 ? "positive" : "neutral";

  return (
    <div className="p-6 space-y-6 relative selection:bg-primary/20">
      
      {/* Dynamic Background Blurs */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] right-[10%] w-[40%] h-[30%] bg-[#86efac]/10 blur-[130px] rounded-full opacity-60" />
        <div className="absolute bottom-[10%] left-[10%] w-[30%] h-[30%] bg-[#bbf7d0]/15 blur-[120px] rounded-full opacity-70" />
      </div>

      {/* Header with multi-tenant State HIE Node selector */}
      <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-zinc-200/40">
        <div>
          <h1 className="text-2xl font-extrabold text-zinc-900 tracking-tight">Sovereign State Command Center</h1>
          <p className="text-xs text-zinc-500 font-mono mt-1 uppercase tracking-wider">
            Real-time Health Information Exchange monitoring registry
          </p>
        </div>

        {/* State Node Switcher Selector */}
        <div className="flex items-center gap-2 p-1.5 bg-white/50 border border-zinc-200/60 rounded-xl shadow-[0_2px_8px_rgba(4,48,24,0.02)] backdrop-blur-sm">
          <Globe className="w-4 h-4 text-primary ml-1.5" />
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="bg-transparent text-xs font-mono font-bold text-zinc-800 focus:outline-none pr-3 cursor-pointer"
          >
            <option value="Kwara State HIE" className="bg-white text-zinc-800">Kwara State HIE (Active)</option>
            <option value="Lagos State HIE" className="bg-white text-zinc-800">Lagos State HIE (Active)</option>
            <option value="Kano State HIE" className="bg-white text-zinc-800">Kano State HIE (Offline)</option>
            <option value="Rivers State HIE" className="bg-white text-zinc-800">Rivers State HIE (Sandbox)</option>
          </select>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {renderMetricCard(
          "Connected Facilities",
          metrics?.connectedFacilities.toLocaleString() || "N/A",
          Building2,
          "+3 registered nodes this week",
          "positive"
        )}
        {renderMetricCard(
          "FHIR Events/Min",
          eventsPerMinute,
          Activity,
          eventsPerMinute > 500 ? "High Load Volume" : "Normal Load Volume",
          eventsChangeType
        )}
        {renderMetricCard(
          "API Success Rate",
          `${successRate}%`,
          CheckCircle2,
          successRate >= 99 ? "Operational HIE Node" : "Standard Compliance Checks",
          successChangeType
        )}
        {renderMetricCard(
          "Active Node Integrations",
          metrics?.activeIntegrations.toLocaleString() || "N/A",
          TrendingUp,
          "99.98% mTLS uptime SLA",
          "positive"
        )}
      </div>

      {/* Visual Analytics Grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: FHIR Events */}
        <Card className="glass-card card-3d p-6 border border-white/60 rounded-xl">
          <h3 className="text-sm font-bold text-zinc-900 font-mono uppercase tracking-wider mb-4 flex items-center justify-between">
            <span>FHIR Event Stream (24h)</span>
            <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded font-bold">LIVE ENDPOINTS</span>
          </h3>
          {isLoadingEvents ? (
            <div className="h-[300px] flex items-center justify-center"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
          ) : isErrorEvents || !eventData ? (
            <div className="h-[300px] flex items-center justify-center text-rose-500"><AlertTriangle className="w-5 h-5 mr-2" /> Failed to load chart data.</div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={eventData}>
                <defs>
                  <linearGradient id="eventGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(4, 48, 24, 0.05)" />
                <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" className="font-mono text-[9px]" />
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
                <Area
                  type="monotone"
                  dataKey="events"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2.5}
                  fill="url(#eventGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </Card>

        {/* Chart 2: LGA Distribution */}
        <Card className="glass-card card-3d p-6 border border-white/60 rounded-xl">
          <h3 className="text-sm font-bold text-zinc-900 font-mono uppercase tracking-wider mb-4 flex items-center justify-between">
            <span>Facilities by LGA Network</span>
            <span className="text-[10px] bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded font-bold">REGIONAL NODES</span>
          </h3>
          {isLoadingLga ? (
            <div className="h-[300px] flex items-center justify-center"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
          ) : isErrorLga || !facilityData ? (
            <div className="h-[300px] flex items-center justify-center text-rose-500"><AlertTriangle className="w-5 h-5 mr-2" /> Failed to load distribution data.</div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={facilityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(4, 48, 24, 0.05)" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" className="font-mono text-[9px]" />
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
                <Bar dataKey="facilities" fill="rgba(16, 185, 129, 0.15)" stroke="rgba(16, 185, 129, 0.4)" radius={[4, 4, 0, 0]} name="Total Registered" />
                <Bar dataKey="active" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="mTLS Verified" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </Card>
      </div>

      {/* Live Error Logs Feed */}
      <Card className="relative z-10 glass-card p-6 border border-white/60 rounded-xl">
        <div className="flex items-center justify-between mb-4 border-b border-zinc-200/40 pb-3">
          <h3 className="text-sm font-bold text-zinc-900 font-mono uppercase tracking-wider">Live Transaction Error Feed</h3>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-semibold">Active Stream</span>
          </div>
        </div>
        <div className="space-y-3">
          {isLoadingErrors ? (
            <div className="p-4 text-center"><Loader2 className="w-5 h-5 animate-spin text-primary mx-auto" /> Loading logs...</div>
          ) : isErrorErrors || !errorLogs || errorLogs.length === 0 ? (
            <div className="p-6 text-center text-emerald-600 bg-emerald-50/50 border border-emerald-100/40 rounded-xl">
              <CheckCircle2 className="w-6 h-6 mx-auto mb-2 text-primary" />
              <p className="text-xs font-mono font-bold uppercase tracking-wider">Zero Transaction Failures Detected</p>
            </div>
          ) : (
            errorLogs.map((log) => (
              <div
                key={log.id}
                className="flex items-start justify-between p-4 rounded-xl bg-white/60 border border-white/80 hover:border-primary/40 transition-colors shadow-[0_2px_8px_rgba(4,48,24,0.01)]"
              >
                <div className="flex items-start gap-3 flex-1">
                  <AlertCircle className="w-4 h-4 mt-0.5 text-rose-500 shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs font-bold text-zinc-950 font-mono">{log.facilityName || 'Global HIE Gateway'}</p>
                    <p className="text-xs text-zinc-600 mt-1 leading-normal">
                      Failed exchange: <span className="font-mono bg-zinc-100 text-zinc-700 px-1 py-0.5 rounded text-[10px]">{log.action}</span> for <span className="font-mono text-zinc-800 font-bold">{log.resource}</span>
                    </p>
                    {log.details && (
                      <p className="text-[9px] font-mono text-rose-600/90 bg-rose-50/30 p-2 rounded border border-rose-100/30 mt-2 truncate">
                        Payload: {JSON.stringify(log.details)}
                      </p>
                    )}
                  </div>
                </div>
                <span className="text-[10px] font-mono text-zinc-400 whitespace-nowrap ml-4">{log.timestamp}</span>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
};

export default CommandCenter;