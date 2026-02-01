import { useEffect, useState } from "react";
import { chatService, type ChatSession } from "@/services/chatService";

interface SidebarProps {
  onSelectSession: (id: string | null) => void;
  refreshTrigger: number;
}

export const Sidebar = ({ onSelectSession, refreshTrigger }: SidebarProps) => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);

  useEffect(() => {
    const loadHistory = async () => {
      const data = await chatService.getSessions();
      setSessions(data);
    };
    loadHistory();
  }, [refreshTrigger]);

  return (
    <aside className="w-[280px] bg-black/40 border-r border-glass-border flex flex-col h-full flex-shrink-0 relative z-20 transition-all duration-300 hidden md:flex">
      {/* Tombol New Chat */}
      <div className="p-3">
        <button 
          onClick={() => onSelectSession(null)}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-surface-hover text-sm text-gray-200 transition-colors border border-transparent hover:border-glass-border group"
        >
          <div className="p-1 rounded bg-white text-black group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-sm">add</span>
          </div>
          <span className="font-medium">New Chat</span>
        </button>
      </div>

      {/* History */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-4">
        <div>
          <h3 className="px-3 text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
            History
          </h3>
          <div className="space-y-0.5">
            {sessions.length === 0 ? (
              <p className="px-3 text-xs text-gray-600 italic">No history yet.</p>
            ) : (
              sessions.map((session) => (
                <button
                  key={session.id}
                  onClick={() => onSelectSession(session.id)}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-surface-hover transition-colors text-left"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    chat_bubble_outline
                  </span>
                  <span className="truncate">{session.title}</span>
                </button>
              ))
            )}
          </div>
        </div>
      </div>

      {/* User Profile (Bottom) */}
      <div className="p-3 border-t border-glass-border mt-auto">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-surface-hover transition-colors group">
          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-primary to-purple-500 flex items-center justify-center text-xs font-bold text-white ring-2 ring-transparent group-hover:ring-white/20 transition-all">
            JS
          </div>
          <div className="text-left flex-1 overflow-hidden">
            <p className="text-sm font-medium text-white truncate">John Smith</p>
            <p className="text-xs text-gray-500 truncate">Pro Plan</p>
          </div>
          <span className="material-symbols-outlined text-gray-500 text-[18px] group-hover:text-white transition-colors">
            settings
          </span>
        </button>
      </div>
    </aside>
  );
};