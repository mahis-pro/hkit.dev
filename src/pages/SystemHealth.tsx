import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Server, Database, Zap, Clock } from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect } from "react";

const latencyData = [
  { time: "00:00", api: 45, db: 12 },
  { time: "04:00", api: 52, db: 15 },
  { time: "08:00", api: 78, db: 23 },
  { time: "12:00", api: 92, db: 28 },
  { time: "16:00", api: 85, db: 25 },
  { time: "20:00", api: 68, db: 18 },
  { time: "23:59", api: 55, db: 14 },
];

const throughputData = [
  { time: "00:00", requests: 1250 },
  { time: "04:00", requests: 980 },
  { time: "08:00", requests: 2340 },
  { time: "12:00", requests: 2890 },
  { time: "16:00", requests: 2650 },
  { time: "20:00", requests: 1870 },
  { time: "23:59", requests: 1420 },
];

const SystemHealth = () => {
  useEffect(() => {
    document.title = "System Health & Observability | Hkit Portal";
  }, []);

  return (
    <div className="p-6 space-y-6 relative selection:bg-primary/20">
      {/* Background Blurs */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] right-[10%] w-[35%] h-[30%] bg-[#86efac]/10 blur-[130px] rounded-full opacity-60" />
      </div>

      {/* Header */}
      <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-zinc-200/40">
        <div>
          <h1 className="text-2xl font-extrabold text-zinc-900 tracking-tight">System Health & Observability</h1>
          <p className="text-xs text-zinc-500 font-mono mt-1 uppercase tracking-wider">
            Monitor infrastructure performance and reliability
          </p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: System Status */}
        <Card className="p-6 border-white/60 flex flex-col justify-between h-36">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider font-bold">System Status</span>
            <div className="p-2 bg-success/10 rounded-lg text-success">
              <Activity className="w-5 h-5" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-zinc-950">99.9%</span>
              <Badge variant="outline" className="bg-success/10 text-success border-success/20 py-0 px-1.5 text-[9px] font-mono font-bold uppercase rounded-md">
                Healthy
              </Badge>
            </div>
            <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Uptime (30d)</p>
          </div>
        </Card>

        {/* Card 2: API Latency */}
        <Card className="p-6 border-white/60 flex flex-col justify-between h-36">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider font-bold">API Latency</span>
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <Server className="w-5 h-5" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-zinc-950">78ms</span>
              <span className="text-[9px] bg-primary/10 text-primary px-1.5 py-0.5 rounded font-mono font-bold uppercase">avg</span>
            </div>
            <p className="text-[10px] font-mono text-emerald-600 font-bold uppercase tracking-wider">-12ms from baseline</p>
          </div>
        </Card>

        {/* Card 3: DB Query Time */}
        <Card className="p-6 border-white/60 flex flex-col justify-between h-36">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider font-bold">DB Query Time</span>
            <div className="p-2 bg-info/10 rounded-lg text-info">
              <Database className="w-5 h-5" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-zinc-950">24ms</span>
              <span className="text-[9px] bg-info/10 text-info px-1.5 py-0.5 rounded font-mono font-bold uppercase">p95</span>
            </div>
            <p className="text-[10px] font-mono text-emerald-600 font-bold uppercase tracking-wider">Optimal</p>
          </div>
        </Card>

        {/* Card 4: Throughput */}
        <Card className="p-6 border-white/60 flex flex-col justify-between h-36">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider font-bold">Throughput</span>
            <div className="p-2 bg-warning/10 rounded-lg text-warning">
              <Zap className="w-5 h-5" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-zinc-950">2,890</span>
              <span className="text-[9px] bg-warning/10 text-warning px-1.5 py-0.5 rounded font-mono font-bold uppercase">req/min</span>
            </div>
            <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Peak: 3,200</p>
          </div>
        </Card>
      </div>

      {/* Analytics Charts */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 border-white/60">
          <h3 className="text-sm font-bold text-zinc-900 font-mono uppercase tracking-wider mb-4 flex items-center justify-between">
            <span>Response Time (24h)</span>
            <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded font-bold">LATENCY LOGS</span>
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={latencyData}>
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
              <Line
                type="monotone"
                dataKey="api"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                name="API (ms)"
              />
              <Line
                type="monotone"
                dataKey="db"
                stroke="hsl(var(--info))"
                strokeWidth={2}
                name="Database (ms)"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 border-white/60">
          <h3 className="text-sm font-bold text-zinc-900 font-mono uppercase tracking-wider mb-4 flex items-center justify-between">
            <span>Request Throughput (24h)</span>
            <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded font-bold">GATEWAY TRAFFIC</span>
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={throughputData}>
              <defs>
                <linearGradient id="throughputGradient" x1="0" y1="0" x2="0" y2="1">
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
                dataKey="requests"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fill="url(#throughputGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Node Details */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* API Gateway Panel */}
        <Card className="p-6 border-white/60">
          <div className="flex items-center gap-3 mb-4 border-b border-zinc-200/40 pb-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-zinc-900 font-mono uppercase tracking-wider">API Gateway</h3>
              <p className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest">mTLS Edge Node</p>
            </div>
          </div>
          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-zinc-200/40">
              <span className="text-zinc-500 font-mono uppercase tracking-wider text-[10px]">Status</span>
              <Badge variant="outline" className="bg-success/10 text-success border-success/20 font-mono font-bold text-[9px] uppercase px-1.5 py-0">
                Healthy
              </Badge>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-zinc-200/40">
              <span className="text-zinc-500 font-mono uppercase tracking-wider text-[10px]">Instances</span>
              <span className="text-zinc-800 font-mono font-bold text-[10px]">4 ACTIVE</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-500 font-mono uppercase tracking-wider text-[10px]">CPU Usage</span>
              <span className="text-zinc-800 font-mono font-bold text-[10px]">42%</span>
            </div>
          </div>
        </Card>

        {/* FHIR Database Panel */}
        <Card className="p-6 border-white/60">
          <div className="flex items-center gap-3 mb-4 border-b border-zinc-200/40 pb-3">
            <div className="w-10 h-10 rounded-lg bg-info/10 flex items-center justify-center text-info">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-zinc-900 font-mono uppercase tracking-wider">FHIR Database</h3>
              <p className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest">Main Repository</p>
            </div>
          </div>
          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-zinc-200/40">
              <span className="text-zinc-500 font-mono uppercase tracking-wider text-[10px]">Status</span>
              <Badge variant="outline" className="bg-success/10 text-success border-success/20 font-mono font-bold text-[9px] uppercase px-1.5 py-0">
                Healthy
              </Badge>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-zinc-200/40">
              <span className="text-zinc-500 font-mono uppercase tracking-wider text-[10px]">Connections</span>
              <span className="text-zinc-800 font-mono font-bold text-[10px]">145 / 500</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-500 font-mono uppercase tracking-wider text-[10px]">Storage</span>
              <span className="text-zinc-800 font-mono font-bold text-[10px]">2.3 TB</span>
            </div>
          </div>
        </Card>

        {/* Message Queue Panel */}
        <Card className="p-6 border-white/60">
          <div className="flex items-center gap-3 mb-4 border-b border-zinc-200/40 pb-3">
            <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center text-warning">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-zinc-900 font-mono uppercase tracking-wider">Message Queue</h3>
              <p className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest">Kafka Cluster</p>
            </div>
          </div>
          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-zinc-200/40">
              <span className="text-zinc-500 font-mono uppercase tracking-wider text-[10px]">Status</span>
              <Badge variant="outline" className="bg-success/10 text-success border-success/20 font-mono font-bold text-[9px] uppercase px-1.5 py-0">
                Healthy
              </Badge>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-zinc-200/40">
              <span className="text-zinc-500 font-mono uppercase tracking-wider text-[10px]">Queue Depth</span>
              <span className="text-zinc-800 font-mono font-bold text-[10px]">234 MSGS</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-500 font-mono uppercase tracking-wider text-[10px]">Processing</span>
              <span className="text-zinc-800 font-mono font-bold text-[10px]">89 MSG/S</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SystemHealth;