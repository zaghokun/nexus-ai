import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { ChatArea } from "@/components/layout/ChatArea";
import { DashboardPanel } from "@/components/layout/DashBoardPanel";

function App() {
  const [showDashboard] = useState(true); 

  return (
    <div className="flex h-screen bg-background-dark text-slate-200 overflow-hidden font-body">
      <Sidebar />
      <ChatArea /> 
      {showDashboard && <DashboardPanel />}

    </div>
  );
}

export default App;