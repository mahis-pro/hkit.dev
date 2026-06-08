import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Building2, Code2, ArrowLeft, Terminal, ShieldCheck, Building } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StateRegistrationForm } from "@/components/registration/StateRegistrationForm";
import { FacilityRegistrationForm } from "@/components/registration/FacilityRegistrationForm";
import { DeveloperRegistrationForm } from "@/components/registration/DeveloperRegistrationForm";

const Register = () => {
  const [activeTab, setActiveTab] = useState<string>("facility");

  useEffect(() => {
    document.title = "Register HIE Node | Hkit Portal";
  }, []);

  return (
    <div className="min-h-screen flex text-foreground bg-gradient-to-tr from-[#f3fbf7] via-[#e6f7ef] to-[#fcfdfd] font-sans selection:bg-primary/20 relative overflow-hidden">
      
      {/* Organic Light Green Neon Diffused Blurs */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[50%] bg-[#bbf7d0]/25 blur-[130px] rounded-full opacity-80" />
        <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[50%] bg-[#86efac]/20 blur-[140px] rounded-full opacity-70" />
      </div>

      {/* LEFT PANE - DYNAMIC INTEGRATION CHECKLIST PIPELINE (35% width on Desktop, hidden on Mobile) */}
      <div className="hidden lg:flex lg:w-[35%] flex-col justify-between p-8 border-r border-emerald-100/40 bg-white/10 backdrop-blur-sm relative z-10 select-none">
        
        {/* Top Header */}
        <div className="flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <img 
              src="/Hkit.png" 
              alt="Hkit Logo" 
              className="h-8 w-auto filter drop-shadow-[0_0_8px_rgba(0,255,156,0.15)]"
            />
            <span className="font-bold text-sm tracking-tight text-zinc-800 uppercase font-mono">HKIT REGISTRATION PLATFORM</span>
          </div>
        </div>

        {/* Dynamic Pipeline Content inside dark glass box for maximum professional contrast */}
        <div className="my-auto space-y-8 glass-card-dark p-8 rounded-2xl border border-white/10 z-10 shadow-2xl">
          {activeTab === "state" && (
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-mono text-primary uppercase tracking-widest font-bold">State Domain Hub</span>
                <h3 className="text-lg font-extrabold text-white tracking-tight mt-1 mb-2 font-mono">Sovereign State Pipeline</h3>
                <p className="text-zinc-400 text-[11px] leading-relaxed">
                  Deploy an independent, state-level Health Information Exchange registry node to orchestrate local clinic systems.
                </p>
              </div>
              <div className="space-y-4 font-mono text-[10px] leading-relaxed">
                <div className="flex gap-3">
                  <div className="w-5 h-5 rounded-full border border-primary bg-primary/10 flex items-center justify-center text-primary font-bold text-[9px] shrink-0">1</div>
                  <div>
                    <h4 className="font-bold text-white uppercase">Initialize Registry Node</h4>
                    <p className="text-zinc-500 mt-0.5">Submit your State MoH administrative details and node sizing.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-5 h-5 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-500 font-bold text-[9px] shrink-0">2</div>
                  <div>
                    <h4 className="font-bold text-zinc-400 uppercase">Deploy State Dashboard</h4>
                    <p className="text-zinc-500 mt-0.5">Setup local Command Centers and custom LGA demographic grids.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-5 h-5 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-500 font-bold text-[9px] shrink-0">3</div>
                  <div>
                    <h4 className="font-bold text-zinc-400 uppercase">Set Local Policy Rules</h4>
                    <p className="text-zinc-500 mt-0.5">Configure consent expiration limits and clinical terminology dictionaries.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "facility" && (
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-mono text-primary uppercase tracking-widest font-bold">Clinical Facility Hub</span>
                <h3 className="text-lg font-extrabold text-white tracking-tight mt-1 mb-2 font-mono">Facility Node Pipeline</h3>
                <p className="text-zinc-400 text-[11px] leading-relaxed">
                  Onboard a hospital or laboratory node under an existing State HIE registry to exchange clinical patient records securely.
                </p>
              </div>
              <div className="space-y-4 font-mono text-[10px] leading-relaxed">
                <div className="flex gap-3">
                  <div className="w-5 h-5 rounded-full border border-primary bg-primary/10 flex items-center justify-center text-primary font-bold text-[9px] shrink-0">1</div>
                  <div>
                    <h4 className="font-bold text-white uppercase">Register parent HIE node</h4>
                    <p className="text-zinc-500 mt-0.5">Select your State HIE registry (e.g. Kwara State, Lagos State) and input details.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-5 h-5 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-500 font-bold text-[9px] shrink-0">2</div>
                  <div>
                    <h4 className="font-bold text-zinc-400 uppercase">Validate payload schemas</h4>
                    <p className="text-zinc-500 mt-0.5">Map and translate local EMR fields into unified HL7 FHIR R4 payloads.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-5 h-5 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-500 font-bold text-[9px] shrink-0">3</div>
                  <div>
                    <h4 className="font-bold text-zinc-400 uppercase">Perform mTLS check</h4>
                    <p className="text-zinc-500 mt-0.5">Establish encrypted, dual-authenticated client-server network sessions.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "developer" && (
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-mono text-primary uppercase tracking-widest font-bold">Developer Hub</span>
                <h3 className="text-lg font-extrabold text-white tracking-tight mt-1 mb-2 font-mono">Standalone Developer Pipeline</h3>
                <p className="text-zinc-400 text-[11px] leading-relaxed">
                  Register clinical vendor applications, retrieve test keys, and build custom tools on the Hkit API sandbox.
                </p>
              </div>
              <div className="space-y-4 font-mono text-[10px] leading-relaxed">
                <div className="flex gap-3">
                  <div className="w-5 h-5 rounded-full border border-primary bg-primary/10 flex items-center justify-center text-primary font-bold text-[9px] shrink-0">1</div>
                  <div>
                    <h4 className="font-bold text-white uppercase">Register Vendor Node</h4>
                    <p className="text-zinc-500 mt-0.5">Input developer organization details and outline clinical use-cases.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-5 h-5 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-500 font-bold text-[9px] shrink-0">2</div>
                  <div>
                    <h4 className="font-bold text-zinc-400 uppercase">Access isolated sandbox</h4>
                    <p className="text-zinc-500 mt-0.5">Instantly receive isolated sandbox API keys and run local mockup requests.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-5 h-5 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-500 font-bold text-[9px] shrink-0">3</div>
                  <div>
                    <h4 className="font-bold text-zinc-400 uppercase">Configure webhooks</h4>
                    <p className="text-zinc-500 mt-0.5">Set secure webhook listener endpoints to stream live HIE clinical events.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Details */}
        <div className="z-10 flex items-center justify-between text-[11px] font-mono text-zinc-500">
          <div className="flex items-center gap-1 font-bold text-zinc-600">
            <ShieldCheck className="w-3.5 h-3.5 text-primary" />
            <span>Kwara State Ministry of Health</span>
          </div>
        </div>
      </div>

      {/* RIGHT PANE - MULTI-DOMAIN REGISTRATION FORMS (65% width, full on Mobile) */}
      <div className="w-full lg:w-[65%] flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-16 relative z-10 overflow-y-auto">
        
        {/* Top Back Link */}
        <div className="absolute top-8 left-8 sm:left-12">
          <Link to="/" className="inline-flex items-center text-xs font-mono uppercase tracking-wider text-zinc-500 hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1.5 text-zinc-400" />
            Back to Home
          </Link>
        </div>

        <div className="w-full max-w-xl mx-auto space-y-8">
          
          {/* Header */}
          <div>
            <h2 className="text-2xl font-extrabold text-zinc-900 tracking-tight">Onboard HIE Integration Node</h2>
            <p className="text-sm text-zinc-600 mt-2 leading-normal">
              Select your integration scope. Deploy a sovereign State Node registry, connect a clinical Facility Node, or request standalone Developer sandbox keys.
            </p>
          </div>

          <Tabs defaultValue="facility" onValueChange={(val) => setActiveTab(val)} className="w-full">
            
            {/* Flat, Clean 3-Column Rectangular Tab Selector */}
            <TabsList className="grid w-full grid-cols-3 bg-white/40 border border-emerald-100/60 h-auto p-1 rounded-lg mb-6">
              <TabsTrigger 
                value="state" 
                className="flex items-center justify-center gap-1.5 py-2.5 rounded-md data-[state=active]:bg-primary data-[state=active]:text-white text-zinc-600 font-mono text-[10px] uppercase tracking-wider transition-all"
              >
                <Building className="w-3.5 h-3.5" />
                <span>State Node</span>
              </TabsTrigger>
              <TabsTrigger 
                value="facility" 
                className="flex items-center justify-center gap-1.5 py-2.5 rounded-md data-[state=active]:bg-primary data-[state=active]:text-white text-zinc-600 font-mono text-[10px] uppercase tracking-wider transition-all"
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Facility Node</span>
              </TabsTrigger>
              <TabsTrigger 
                value="developer" 
                className="flex items-center justify-center gap-1.5 py-2.5 rounded-md data-[state=active]:bg-primary data-[state=active]:text-white text-zinc-600 font-mono text-[10px] uppercase tracking-wider transition-all"
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>Developer</span>
              </TabsTrigger>
            </TabsList>

            {/* Frosted Glass Container for Forms with interactive 3D feel */}
            <div className="glass-card rounded-xl p-6 sm:p-8 border border-white/60 shadow-[0_8px_32px_rgba(4,48,24,0.04)] card-3d">
              <TabsContent value="state" className="mt-0 outline-none">
                <StateRegistrationForm />
              </TabsContent>

              <TabsContent value="facility" className="mt-0 outline-none">
                <FacilityRegistrationForm />
              </TabsContent>

              <TabsContent value="developer" className="mt-0 outline-none">
                <DeveloperRegistrationForm />
              </TabsContent>
            </div>
            
          </Tabs>

          {/* Form Footer */}
          <div className="pt-4 border-t border-zinc-200/40 text-center">
            <p className="text-xs text-zinc-500 font-mono">
              Already registered and verified?{" "}
              <Link to="/login" className="text-primary font-bold hover:underline">
                Authenticate node
              </Link>
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Register;