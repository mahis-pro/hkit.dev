import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { TopBar } from "./TopBar";
import { Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";

export function AppLayout() {
  const { user } = useAuth();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-tr from-[#f3fbf7] via-[#e6f7ef] to-[#fcfdfd] text-foreground relative overflow-hidden">
        
        {/* Organic Light Green Neon Backdrops for all dashboard nodes */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[45%] h-[40%] bg-[#bbf7d0]/20 blur-[130px] rounded-full opacity-80" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[35%] h-[35%] bg-[#86efac]/15 blur-[120px] rounded-full opacity-60" />
        </div>

        <AppSidebar />
        <div className="flex-1 flex flex-col relative z-10 w-full overflow-hidden">
          <TopBar />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-transparent p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}