import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LogIn, Loader2, ArrowLeft, Terminal, Server, ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";

interface LogLine {
  id: number;
  time: string;
  module: string;
  message: string;
  type: "info" | "success" | "warn" | "error" | "debug";
}

const INITIAL_LOGS: LogLine[] = [
  { id: 1, time: "19:33:01", module: "GATEWAY", message: "Inbound POST /fhir/Patient from Node #42 (General Hosp Ilorin)", type: "info" },
  { id: 2, time: "19:33:01", module: "mTLS", message: "Client cert verified successfully (Serial: 4c:8b:2d:ef)", type: "success" },
  { id: 3, time: "19:33:01", module: "INTEROP", message: "HL7v2 mapped to FHIR R4 schema payload", type: "success" },
  { id: 4, time: "19:33:02", module: "TERMINOLOGY", message: "Local code LAB-PCV mapped to LOINC 20570-8", type: "debug" },
  { id: 5, time: "19:33:02", module: "MPI", message: "Identity match index returned 98.4% (Resolved to HIE-982)", type: "info" },
  { id: 6, time: "19:33:02", module: "CONSENT", message: "Access granted: Active patient sharing policy in place", type: "success" },
  { id: 7, time: "19:33:03", module: "AUDIT", message: "Immutable transaction block written (Hash: 8b3f2c9e7a)", type: "info" },
  { id: 8, time: "19:33:03", module: "GATEWAY", message: "HTTP 200 OK returned to Node #42 (Latency: 32ms)", type: "success" }
];

const MOCK_TEMPLATES = [
  { module: "GATEWAY", message: "Inbound GET /fhir/Observation/HIE-982 from Node #19 (Offa Specialist Hosp)", type: "info" },
  { module: "mTLS", message: "mTLS session established with client 192.168.12.82", type: "debug" },
  { module: "CONSENT", message: "Granular access request evaluated: DEMOGRAPHICS = Granted, LABS = Revoked", type: "warn" },
  { module: "MPI", message: "Identity check: No match found. Triggering auto-registration for HIE-1024", type: "info" },
  { module: "AUDIT", message: "Cryptographic signature validated for ledger sync (Block #4092)", type: "success" },
  { module: "INTEROP", message: "Validation warning: missing non-critical field 'telecom.use' at FHIR Patient schema", type: "warn" },
  { module: "GATEWAY", message: "Inbound POST /fhir/Encounter from Node #88 (Omu-Aran General Hosp)", type: "info" },
  { module: "mTLS", message: "Client cert verified successfully (Serial: 9a:2c:1e:bf)", type: "success" },
  { module: "INTEROP", message: "Encounter mapped to secure FHIR payload successfully", type: "success" },
  { module: "GATEWAY", message: "HTTP 201 Created returned to Node #88 (Latency: 24ms)", type: "success" }
];

const Login = () => {
  const { login, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Live Terminal Log Simulator state
  const [logs, setLogs] = useState<LogLine[]>(INITIAL_LOGS);
  const logCounter = useRef(INITIAL_LOGS.length + 1);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = "Sign In | Hkit Portal";
  }, []);

  // Log simulation loop
  useEffect(() => {
    const interval = setInterval(() => {
      const template = MOCK_TEMPLATES[Math.floor(Math.random() * MOCK_TEMPLATES.length)];
      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;
      
      const newLog: LogLine = {
        id: logCounter.current++,
        time: timeStr,
        module: template.module,
        message: template.message,
        type: template.type as any
      };

      setLogs((prevLogs) => {
        const updated = [...prevLogs, newLog];
        return updated.slice(-15); // keep last 15 items
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Auto-scroll terminal
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs]);

  if (isAuthenticated && !isLoading) {
    return null; 
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await login(email, password);
    setIsSubmitting(false);
  };

  const isBusy = isLoading || isSubmitting;

  return (
    <div className="min-h-screen flex text-foreground bg-gradient-to-tr from-[#f3fbf7] via-[#e6f7ef] to-[#fcfdfd] font-sans selection:bg-primary/20 relative overflow-hidden">
      
      {/* Organic Light Green Neon Diffused Blurs */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[50%] bg-[#bbf7d0]/25 blur-[130px] rounded-full opacity-80" />
        <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[50%] bg-[#86efac]/20 blur-[140px] rounded-full opacity-70" />
      </div>

      {/* LEFT PANE - TERMINAL TRANSACTION SIMULATOR (60% width on Desktop, hidden on Mobile) */}
      <div className="hidden lg:flex lg:w-3/5 flex-col justify-between p-8 border-r border-emerald-100/40 bg-white/10 backdrop-blur-sm relative z-10 select-none">
        
        {/* Top Header */}
        <div className="flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center font-bold text-white text-sm shadow-[0_4px_12px_rgba(16,185,129,0.2)]">Hk</div>
            <span className="font-bold text-sm tracking-tight text-zinc-800 uppercase font-mono">HKIT INFRASTRUCTURE HUB</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
            <Server className="w-3.5 h-3.5" />
            <span>KWARA_HIE_PROD_1</span>
          </div>
        </div>

        {/* Live Terminal Log Board - Deep Dark Glassmorphic for maximum high-contrast aesthetic */}
        <div className="my-8 flex-1 flex flex-col justify-end glass-card-dark rounded-xl p-6 font-mono text-[11px] leading-relaxed relative z-10 shadow-2xl border border-white/10">
          <div className="absolute top-4 left-4 flex items-center gap-2 text-zinc-500 text-[10px] pb-3 border-b border-white/5 w-[calc(100%-32px)]">
            <Terminal className="w-3.5 h-3.5 text-primary" />
            <span>LIVE TRANSACTION LOG EXCHANGER</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse ml-auto" />
            <span className="text-[9px] text-emerald-500/80">ONLINE</span>
          </div>

          <div className="space-y-1.5 overflow-y-auto max-h-[360px] pr-2 pt-6">
            {logs.map((log) => {
              let moduleColor = "text-blue-400";
              if (log.type === "success") {
                moduleColor = "text-emerald-400";
              } else if (log.type === "warn") {
                moduleColor = "text-amber-400";
              } else if (log.type === "error") {
                moduleColor = "text-rose-400";
              } else if (log.type === "debug") {
                moduleColor = "text-zinc-400";
              }

              return (
                <div key={log.id} className="transition-opacity duration-300 flex items-start gap-2">
                  <span className="text-zinc-600 font-bold shrink-0">[{log.time}]</span>
                  <span className={`font-bold shrink-0 ${moduleColor} w-16`}>{log.module}</span>
                  <span className="text-zinc-300 break-all">{log.message}</span>
                </div>
              );
            })}
            <div ref={terminalEndRef} />
          </div>
        </div>

        {/* Bottom Details */}
        <div className="z-10 flex items-center justify-between text-[11px] font-mono text-zinc-500">
          <div className="flex items-center gap-1 font-bold text-zinc-600">
            <ShieldCheck className="w-3.5 h-3.5 text-primary" />
            <span>Kwara State Ministry of Health</span>
          </div>
          <span>NDPA COMPLIANT CORE v2.4.1</span>
        </div>
      </div>

      {/* RIGHT PANE - AUTHENTICATION FORM (40% width, full on Mobile) */}
      <div className="w-full lg:w-2/5 flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-12 relative z-10">
        
        {/* Small top back-link */}
        <div className="absolute top-8 left-8 sm:left-12">
          <Link to="/" className="inline-flex items-center text-xs font-mono uppercase tracking-wider text-zinc-500 hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1.5 text-zinc-400" />
            Back to Home
          </Link>
        </div>

        {/* Glass Card credentials container */}
        <div className="w-full max-w-sm mx-auto glass-card p-8 rounded-xl border border-white/60 shadow-[0_8px_32px_rgba(4,48,24,0.04)] card-3d">
          
          {/* Form Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-extrabold text-zinc-900 tracking-tight">Welcome Back</h2>
            <p className="text-xs text-zinc-600 mt-2 leading-normal">
              Sign in with your organizational credentials to access the Hkit HIE network management node.
            </p>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-bold">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@moh.kwara.ng"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isBusy}
                className="bg-white/60 border-zinc-200/80 text-zinc-800 placeholder:text-zinc-400 focus-visible:ring-primary/40 focus-visible:border-primary/40 h-10 rounded-lg text-xs"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-bold">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isBusy}
                className="bg-white/60 border-zinc-200/80 text-zinc-800 placeholder:text-zinc-400 focus-visible:ring-primary/40 focus-visible:border-primary/40 h-10 rounded-lg text-xs"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full h-10 bg-primary text-white font-semibold hover:bg-primary/95 rounded-lg text-xs transition-colors shadow-[0_4px_12px_rgba(16,185,129,0.2)]" 
              disabled={isBusy}
            >
              {isBusy ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <LogIn className="w-4 h-4 mr-2" />
              )}
              Authenticate Session
            </Button>
          </form>

          {/* Form Footer */}
          <div className="pt-4 mt-6 border-t border-zinc-200/40 text-center">
            <p className="text-[10px] text-zinc-500 font-mono">
              Pending integration?{" "}
              <Link to="/register" className="text-primary font-bold hover:underline">
                Request access node
              </Link>
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Login;