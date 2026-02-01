import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Sidebar } from "@/components/layout/Sidebar";
import { ChatArea } from "@/components/layout/ChatArea";
import { DashboardPanel } from "./components/layout/DashBoardPanel";

function App() {
  const [showDashboard, setShowDashboard] = useState(true);
  const [currentSessionId, setCurrentSessionId] = useState<string>(() => uuidv4());
  
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleSelectSession = (id: string | null) => {
    if (id) {
      setCurrentSessionId(id);
    } else {
      setCurrentSessionId(uuidv4());
    }
  };

  const handleMessageSent = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="flex h-screen bg-background-dark text-slate-200 overflow-hidden font-body">
      <Sidebar 
        onSelectSession={handleSelectSession} 
        refreshTrigger={refreshTrigger} 
      />

      <ChatArea 
        sessionId={currentSessionId} 
        onMessageSent={handleMessageSent}
      />

      {showDashboard && <DashboardPanel />}
    </div>
  );
}

export default App;