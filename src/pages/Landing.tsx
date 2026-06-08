import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  Network, Shield, Lock, ArrowRight, Code2, 
  Building2, Users, Activity, Orbit, Server, Layers,
  CheckCircle2, ArrowUpRight, Building
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#f3fbf7] via-[#e6f7ef] to-[#fcfdfd] text-foreground font-sans overflow-x-hidden relative selection:bg-primary/20">
      
      {/* Organic Light Green Neon Diffused Blurs */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[50%] bg-[#bbf7d0]/25 blur-[130px] rounded-full opacity-80" />
        <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[50%] bg-[#86efac]/20 blur-[140px] rounded-full opacity-70" />
        <div className="absolute top-[40%] left-[20%] w-[45%] h-[40%] bg-[#dcfce7]/30 blur-[120px] rounded-full opacity-60" />
      </div>

      {/* 1. TOP HEADER NAVIGATION (GLASSMORPHIC) */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/40 bg-white/25 backdrop-blur-md">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center font-bold text-white text-sm shadow-[0_4px_12px_rgba(16,185,129,0.2)]">Hk</div>
            <span className="font-bold text-lg tracking-tight text-zinc-900">Hkit</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-wider text-zinc-600">
            <a href="#architecture-3d" className="hover:text-primary transition-colors">Hierarchy</a>
            <a href="#features" className="hover:text-primary transition-colors">Core Nodes</a>
            <a href="#architecture" className="hover:text-primary transition-colors">Data Flow</a>
            <a href="#developers" className="hover:text-primary transition-colors">Developers</a>
          </nav>
          <div className="flex items-center gap-4">
            <button onClick={() => navigate("/login")} className="text-xs font-mono uppercase tracking-wider text-zinc-600 hover:text-primary transition-colors">
              Sign In
            </button>
            <Button 
              onClick={() => navigate("/register")} 
              size="sm" 
              className="bg-primary text-white hover:bg-primary/95 font-semibold px-4 h-9 rounded-lg transition-all text-xs shadow-[0_4px_12px_rgba(16,185,129,0.15)]"
            >
              Request Access
            </Button>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative z-10 pt-40 pb-24 lg:pt-52 lg:pb-36 container mx-auto px-6 text-center max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono mb-8 uppercase tracking-widest shadow-[0_2px_8px_rgba(16,185,129,0.05)]">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          Kwara State Health Information Exchange
        </div>
        
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-zinc-900 mb-6 leading-[1.08]">
          The secure backbone of <br />
          modern digital healthcare.
        </h1>
        
        <p className="text-base sm:text-lg text-zinc-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          Hkit provides unified national-scale interoperability, master patient indexing, and real-time consent enforcement. Connect once, exchange with the entire healthcare ecosystem securely.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Button 
            onClick={() => navigate("/register")} 
            size="lg" 
            className="w-full sm:w-auto bg-primary text-white hover:bg-primary/95 font-semibold px-8 h-12 rounded-lg transition-all shadow-[0_4px_20px_rgba(16,185,129,0.25)]"
          >
            Request Node Access
          </Button>
          <Button 
            onClick={() => navigate("/login")} 
            size="lg" 
            variant="outline" 
            className="w-full sm:w-auto border-emerald-200/60 bg-white/40 backdrop-blur-sm hover:bg-white/80 font-semibold px-8 h-12 rounded-lg text-zinc-800 transition-all shadow-[0_4px_12px_rgba(4,48,24,0.02)]"
          >
            Management Portal
          </Button>
        </div>
      </section>

      {/* 3. TRUSTED ECOSYSTEM BRANDS */}
      <section className="relative z-10 py-10 border-y border-emerald-100/40 bg-white/20 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 text-center mb-6">
            Connecting sovereign health systems & nodes
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 text-zinc-600 font-semibold tracking-tight text-sm">
            <div className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
              <Building2 className="w-4 h-4 text-primary" />
              <span>Ministry of Health</span>
            </div>
            <div className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
              <Orbit className="w-4 h-4 text-primary" />
              <span>National Labs</span>
            </div>
            <div className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
              <Activity className="w-4 h-4 text-primary" />
              <span>Alliance HMO</span>
            </div>
            <div className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
              <Network className="w-4 h-4 text-primary" />
              <span>State General Hospital</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3.5 THREE-DOMAIN SOVEREIGN ARCHITECTURE SECTION (3D GLASSMORPHISM OVERHAUL) */}
      <section id="architecture-3d" className="relative z-10 py-24 sm:py-32 border-b border-emerald-100/40 perspective-3d">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <span className="text-xs font-mono text-primary uppercase tracking-widest">Architectural Hierarchy</span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-zinc-900 mt-2 mb-4 tracking-tight">
              Three-Domain Multi-Tenant Infrastructure
            </h2>
            <p className="text-zinc-600 text-sm max-w-lg mx-auto leading-relaxed">
              Designed as a sovereign HIE system enabling multi-state orchestration, granular clinical data routing, and robust vendor sandboxing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Domain 1: State */}
            <div className="glass-card card-3d shine-sweep p-8 rounded-xl flex flex-col justify-between h-[380px] border border-white/60">
              <div>
                <span className="text-[9px] font-mono text-primary bg-primary/10 px-2.5 py-1 rounded-md uppercase tracking-wider font-bold">DOMAIN 01</span>
                <h3 className="text-lg font-extrabold text-zinc-900 mt-5 mb-3">State HIE Nodes</h3>
                <p className="text-zinc-600 text-xs leading-relaxed">
                  For State Ministries of Health. Deploy a sovereign registry instance, manage regional LGA databases, onboard clinical facilities, set cryptographic consent guidelines, and oversee state-wide event performance logs.
                </p>
              </div>
              <div className="flex items-center text-xs text-primary font-bold gap-1 cursor-pointer hover:text-primary/80 transition-colors pt-4" onClick={() => navigate("/register")}>
                <span>Initialize State Node</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Domain 2: Facility */}
            <div className="glass-card card-3d shine-sweep p-8 rounded-xl flex flex-col justify-between h-[380px] border border-white/60">
              <div>
                <span className="text-[9px] font-mono text-primary bg-primary/10 px-2.5 py-1 rounded-md uppercase tracking-wider font-bold">DOMAIN 02</span>
                <h3 className="text-lg font-extrabold text-zinc-900 mt-5 mb-3">Facility Clinical Nodes</h3>
                <p className="text-zinc-600 text-xs leading-relaxed">
                  For Hospitals, Clinics, and Labs. Securely connect and authenticate clinical nodes under a parent State HIE. Bridge legacy EMR structures to native FHIR formats, synchronise patient identities, and query real-time consent registries.
                </p>
              </div>
              <div className="flex items-center text-xs text-primary font-bold gap-1 cursor-pointer hover:text-primary/80 transition-colors pt-4" onClick={() => navigate("/register")}>
                <span>Onboard Clinical Node</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Domain 3: Developer */}
            <div className="glass-card card-3d shine-sweep p-8 rounded-xl flex flex-col justify-between h-[380px] border border-white/60">
              <div>
                <span className="text-[9px] font-mono text-primary bg-primary/10 px-2.5 py-1 rounded-md uppercase tracking-wider font-bold">DOMAIN 03</span>
                <h3 className="text-lg font-extrabold text-zinc-900 mt-5 mb-3">Standalone Developer Sandbox</h3>
                <p className="text-zinc-600 text-xs leading-relaxed">
                  For Vendors, Integrators, and Developers. Access fully isolated testing sandboxes. Query test patient endpoints, validate schemas, establish mock webhooks, and secure standalone OAuth2 credentials without production friction.
                </p>
              </div>
              <div className="flex items-center text-xs text-primary font-bold gap-1 cursor-pointer hover:text-primary/80 transition-colors pt-4" onClick={() => navigate("/register")}>
                <span>Access Developer Sandbox</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. CORE INFRASTRUCTURE SERVICES (BENTO GRID WITH 3D GLASS EFFECT) */}
      <section id="features" className="relative z-10 py-24 sm:py-32 container mx-auto px-6 max-w-6xl perspective-3d">
        <div className="mb-16">
          <span className="text-xs font-mono text-primary uppercase tracking-widest">Platform Core</span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-zinc-900 mt-2 mb-4 tracking-tight">
            Infrastructure-Grade Core Services
          </h2>
          <p className="text-zinc-600 text-sm max-w-lg leading-relaxed">
            Engineered to handle high-throughput, latency-critical health transactions with ironclad cryptographic security.
          </p>
        </div>

        {/* Row 1: 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          
          {/* Card 1: Interoperability */}
          <div className="glass-card card-3d shine-sweep p-6 rounded-xl border border-white/60 flex flex-col justify-between h-[380px]">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Network className="w-5 h-5 text-primary" />
                <span className="font-bold text-sm text-zinc-900">Interoperability Layer</span>
              </div>
              <p className="text-zinc-600 text-xs leading-relaxed">
                Bi-directional translation mapping legacy EMR databases, HL7v2 feeds, and standard patient records into secure HL7 FHIR R4 schema.
              </p>
            </div>
            {/* Dark glass inner container for 3D feel */}
            <div className="rounded-lg border border-white/10 bg-[#060c09] p-4 font-mono text-[10px] leading-relaxed text-zinc-400 overflow-hidden shadow-[8px_8px_0_rgba(16,185,129,0.05)]">
              <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-2 text-zinc-500">
                <span>payload_transformer.py</span>
                <span className="text-[9px] bg-primary/10 text-primary px-1.5 py-0.5 rounded">HL7 → FHIR</span>
              </div>
              <div className="text-zinc-500"># Mapping identifiers</div>
              <div><span className="text-primary">PID-3</span>: "100234" <span className="text-zinc-600">→</span> <span className="text-blue-400">identifier.value</span></div>
              <div><span className="text-primary">PID-5.1</span>: "Bello" <span className="text-zinc-600">→</span> <span className="text-blue-400">name[0].family</span></div>
              <div><span className="text-primary">PID-8</span>: "M" <span className="text-zinc-600">→</span> <span className="text-blue-400">gender: "male"</span></div>
              <div className="mt-2 text-emerald-400 font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                FHIR standard schema validated.
              </div>
            </div>
          </div>

          {/* Card 2: Master Patient Index */}
          <div className="glass-card card-3d shine-sweep p-6 rounded-xl border border-white/60 flex flex-col justify-between h-[380px]">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-5 h-5 text-primary" />
                <span className="font-bold text-sm text-zinc-900">Master Patient Index</span>
              </div>
              <p className="text-zinc-600 text-xs leading-relaxed">
                Deterministic and probabilistic matching algorithms identifying and linking disjoint patient records globally without leaking PII.
              </p>
            </div>
            <div className="space-y-2">
              <div className="p-2.5 rounded-lg border border-emerald-100/50 bg-white/70 flex flex-col gap-1.5 shadow-[4px_4px_0_rgba(16,185,129,0.03)]">
                <div className="flex justify-between items-center text-[9px] text-zinc-500 font-mono">
                  <span>FACILITY A (General Hosp)</span>
                  <span>ID: 5938</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-zinc-800">Amina Bello</span>
                  <span className="text-zinc-500 font-mono">12-04-1988</span>
                </div>
              </div>
              <div className="flex justify-center text-primary font-mono text-[9px] flex-col items-center">
                <span className="font-bold">MATCH DETECTED (98.4%)</span>
                <span className="h-2.5 w-px bg-primary/30" />
              </div>
              <div className="p-2.5 rounded-lg border border-primary/20 bg-primary/5 flex flex-col gap-1.5 shadow-[4px_4px_0_rgba(16,185,129,0.03)]">
                <div className="flex justify-between items-center text-[9px] text-primary/70 font-mono">
                  <span>FACILITY B (National Lab)</span>
                  <span>ID: HIE-982</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-primary">Aminat Bello</span>
                  <span className="text-primary/70 font-mono">12-04-1988</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Consent Management */}
          <div className="glass-card card-3d shine-sweep p-6 rounded-xl border border-white/60 flex flex-col justify-between h-[380px]">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-5 h-5 text-primary" />
                <span className="font-bold text-sm text-zinc-900">Consent Registry</span>
              </div>
              <p className="text-zinc-600 text-xs leading-relaxed">
                Legally-binding, patient-controlled cryptographic consent policies enforced in real-time at the API Gateway level.
              </p>
            </div>
            <div className="rounded-lg border border-emerald-100/50 bg-white/70 p-3.5 space-y-2.5 text-xs shadow-[8px_8px_0_rgba(16,185,129,0.03)]">
              <div className="flex items-center justify-between text-[10px] text-zinc-500 pb-2 border-b border-zinc-100 font-mono">
                <span>PATIENT POLICIES</span>
                <span className="text-primary bg-primary/10 px-2 py-0.5 rounded font-bold text-[8px]">ENFORCED</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-700 text-xs">Share Demographics</span>
                <div className="w-6 h-3 bg-primary rounded-full relative flex items-center justify-end px-0.5">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-700 text-xs">Share Diagnoses & Labs</span>
                <div className="w-6 h-3 bg-zinc-200 rounded-full relative flex items-center justify-start px-0.5">
                  <div className="w-2 h-2 bg-zinc-400 rounded-full" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-700 text-xs">Share Prescriptions</span>
                <div className="w-6 h-3 bg-primary rounded-full relative flex items-center justify-end px-0.5">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Row 2: 2 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Card 4: Terminology Translation */}
          <div className="glass-card card-3d shine-sweep p-6 rounded-xl border border-white/60 flex flex-col justify-between h-[300px]">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Layers className="w-5 h-5 text-primary" />
                <span className="font-bold text-sm text-zinc-900">Terminology Engine</span>
              </div>
              <p className="text-zinc-600 text-xs leading-relaxed">
                Real-time semantic mapping aligning heterogeneous regional clinic codes directly to international terminology systems like SNOMED-CT, LOINC, and ICD-10.
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-[#060c09] p-4 font-mono text-[10px] space-y-2 text-zinc-300 shadow-[8px_8px_0_rgba(16,185,129,0.05)]">
              <div className="text-zinc-500">// Dictionary Lookup Protocol</div>
              <div className="flex items-center justify-between text-zinc-400">
                <span>Local Code: "MAL-DIAG"</span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-600" />
                <span className="text-primary font-bold">SNOMED: 57523000</span>
              </div>
              <div className="text-[9px] text-zinc-500 pl-4">Description: "Malaria due to Plasmodium falciparum"</div>
              <div className="flex items-center justify-between text-zinc-400 pt-2 border-t border-white/5">
                <span>Local Code: "LAB-PCV"</span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-600" />
                <span className="text-primary font-bold">LOINC: 20570-8</span>
              </div>
            </div>
          </div>

          {/* Card 5: Secure Gateway & Immutable Logging */}
          <div className="glass-card card-3d shine-sweep p-6 rounded-xl border border-white/60 flex flex-col justify-between h-[300px]">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Lock className="w-5 h-5 text-primary" />
                <span className="font-bold text-sm text-zinc-900">mTLS & Verifiable Auditing</span>
              </div>
              <p className="text-zinc-600 text-xs leading-relaxed">
                Mandatory mutual TLS endpoints combined with crytpographically signed access logging guarantees compliance with sovereign data protection guidelines (NDPA).
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-[#060c09] p-3.5 font-mono text-[9px] space-y-1 text-zinc-400 shadow-[8px_8px_0_rgba(16,185,129,0.05)]">
              <div className="flex items-center justify-between pb-1.5 border-b border-white/5 mb-1.5">
                <span className="text-emerald-400 font-bold flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> mTLS SECURE ENDPOINT</span>
                <span className="text-zinc-600">SHA-256</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500 font-bold">GET</span>
                <span className="text-zinc-300">/fhir/Patient/HIE-982</span>
                <span className="text-emerald-400 font-bold">200 OK</span>
              </div>
              <div className="text-zinc-600 text-[8px] truncate">Tx Signature: 8b3f2c9e7a...ef42ac</div>
              <div className="flex justify-between pt-1 border-t border-white/5 text-[9px]">
                <span className="text-primary font-bold">AUDIT BLOCKCHAIN WRITTEN</span>
                <span className="text-emerald-400 font-bold">VERIFIED ✓</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. DATA FLOW ARCHITECTURE MAP (GLASSMORPHIC TIMELINE) */}
      <section id="architecture" className="relative z-10 py-24 sm:py-32 border-t border-emerald-100/40 bg-white/10 backdrop-blur-sm">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-16">
            <span className="text-xs font-mono text-primary uppercase tracking-widest">Network Topology</span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-zinc-900 mt-2 mb-4 tracking-tight">
              Data Flow Architecture
            </h2>
            <p className="text-zinc-600 text-sm max-w-lg mx-auto leading-relaxed">
              Standardized real-time secure routing bridging edge clients and national reporting nodes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {[
              { step: "01", title: "EMR Client Request", desc: "Local database initiates HL7 or custom SOAP/REST payload transfer." },
              { step: "02", title: "Security Gateway", desc: "mTLS client verification and OAuth2 token access checks." },
              { step: "03", title: "Standardize (FHIR)", desc: "Payload parsing and LOINC/SNOMED terminology alignment." },
              { step: "04", title: "MPI & Identity Check", desc: "Verifying patient demographics registry and merging record IDs." },
              { step: "05", title: "Secure Destination Routing", desc: "Authorized payload dispatch to National Labs, HMOs, or MoH Hubs." }
            ].map((node, i) => (
              <div key={i} className="glass-card p-5 rounded-lg border border-white/60 flex flex-col justify-between h-40 shadow-[4px_4px_0_rgba(16,185,129,0.02)]">
                <div>
                  <div className="text-zinc-400 font-mono text-[9px] mb-2 font-bold">STEP {node.step}</div>
                  <h4 className="font-bold text-xs text-zinc-800 mb-2">{node.title}</h4>
                  <p className="text-zinc-600 text-[10px] leading-normal">{node.desc}</p>
                </div>
                <div className="flex justify-between items-center text-[9px] font-mono text-primary font-bold">
                  <span>ACTIVE</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. DEVELOPER EXTRAS */}
      <section id="developers" className="relative z-10 py-24 sm:py-32 border-t border-emerald-100/40">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-mono text-primary uppercase tracking-widest">Built for Engineers</span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-zinc-900 mt-2 mb-4 tracking-tight">
                Integrate complex health systems in days.
              </h2>
              <p className="text-zinc-600 text-sm leading-relaxed mb-6">
                We provide a fully documented, API-first architecture designed to support production-ready integration nodes quickly and securely.
              </p>
              <div className="space-y-4">
                {[
                  "RESTful HL7 FHIR R4 Compliant API endpoints",
                  "Event-driven webhooks with automated retries",
                  "Isolated sandbox testing environment",
                  "Native SDK modules for TypeScript, Go, and Python"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-zinc-700 text-xs font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Glassmorphic 3D Terminal Frame */}
            <div className="rounded-lg border border-white/60 bg-[#060c09] overflow-hidden shadow-2xl card-3d">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-black/40">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                </div>
                <div className="text-[10px] text-zinc-500 font-mono">api.hkit.national/submit</div>
              </div>
              <div className="p-5 font-mono text-[10px] sm:text-xs leading-relaxed text-zinc-300 overflow-x-auto">
                <div className="text-blue-400">POST <span className="text-primary font-bold">/fhir/Patient</span> HTTP/2</div>
                <div className="text-zinc-500">Authorization: Bearer hk_live_xxxxxxxx</div>
                <div className="text-zinc-500 mb-4">Content-Type: application/fhir+json</div>
                <div>{"{"}</div>
                <div className="pl-4">"resourceType": <span className="text-emerald-400">"Patient"</span>,</div>
                <div className="pl-4">"identifier": [{"{"}</div>
                <div className="pl-8">"system": <span className="text-emerald-400">"urn:oid:national.id"</span>,</div>
                <div className="pl-8">"value": <span className="text-emerald-400">"12345"</span></div>
                <div className="pl-4">{"}"}],</div>
                <div className="pl-4">"name": [{"{"}</div>
                <div className="pl-8">"family": <span className="text-emerald-400">"Doe"</span>,</div>
                <div className="pl-8">"given": [<span className="text-emerald-400">"John"</span>]</div>
                <div className="pl-4">{"}"}]</div>
                <div>{"}"}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. PERFORMANCE & TRUST STATS */}
      <section className="relative z-10 py-16 border-y border-emerald-100/40 bg-white/20 backdrop-blur-sm">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-zinc-900 mb-1">350+</div>
              <div className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider font-bold">Connected Facilities</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-zinc-900 mb-1">12M+</div>
              <div className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider font-bold">Data Exchanges</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-zinc-900 mb-1">99.99%</div>
              <div className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider font-bold">System Uptime SLA</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-zinc-900 mb-1">&lt;35ms</div>
              <div className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider font-bold">Median Latency</div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CALL TO ACTION */}
      <section className="relative z-10 py-24 sm:py-32 container mx-auto px-6 max-w-4xl text-center">
        <h2 className="text-3xl sm:text-5xl font-extrabold text-zinc-900 mb-4 tracking-tight">
          Join the sovereign health backbone.
        </h2>
        <p className="text-zinc-600 text-sm max-w-lg mx-auto mb-8 leading-relaxed">
          Provide your local clinical node with advanced national interoperability, seamless client consent, and global identity resolution.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button 
            onClick={() => navigate("/register")} 
            size="lg" 
            className="bg-primary text-white hover:bg-primary/95 font-semibold px-8 h-12 rounded-lg transition-all text-sm shadow-[0_4px_20px_rgba(16,185,129,0.2)]"
          >
            Get Started
          </Button>
          <Button 
            onClick={() => navigate("/login")} 
            size="lg" 
            variant="outline" 
            className="border-emerald-200/60 bg-white/40 backdrop-blur-sm hover:bg-white/80 font-semibold px-8 h-12 rounded-lg text-zinc-800 transition-all text-sm shadow-[0_4px_12px_rgba(4,48,24,0.02)]"
          >
            Management Portal <ArrowUpRight className="ml-2 w-4 h-4 text-zinc-400" />
          </Button>
        </div>
      </section>

      {/* 9. MINIMAL TECHNICAL FOOTER */}
      <footer className="relative z-10 py-12 border-t border-emerald-100/40 bg-white/30 backdrop-blur-sm">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex flex-col md:flex-row items-center justify-between text-xs text-zinc-500">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <span className="font-bold text-zinc-800 font-mono uppercase text-sm tracking-wider">HKIT INFRASTRUCTURE</span>
              <span className="h-4 w-px bg-emerald-200/40" />
              <p>© {new Date().getFullYear()} Kwara State Ministry of Health. All rights reserved.</p>
            </div>
            <div className="flex gap-6 font-mono font-bold text-zinc-600">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-primary transition-colors">Security Audit</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Landing;