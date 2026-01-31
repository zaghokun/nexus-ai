import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Hero } from "./Hero";
import { chatService, type ChatMessage } from "@/services/chatService";

export const ChatArea = () => {
  // 1. State untuk Session ID 
  const [sessionId] = useState(() => uuidv4());
  
  // 2. State Pesan 
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  
  // 3. State Loading 
  const [isLoading, setIsLoading] = useState(false);

  // Ref auto-scroll ke bawah
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // --- FUNGSI UTAMA PENGIRIM PESAN ---
  const handleSend = async (text: string) => {
    if (!text.trim() || isLoading) return;

    // A. pesan USER ke layar
    const userMsg: ChatMessage = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    // B. tempat untuk pesan AI 
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    // C. API Service dengan Streaming
    await chatService.sendMessageStream(
      sessionId,
      text,
      (chunk) => {
        // Callback
        setMessages((prev) => {
          const newMessages = [...prev];
          const lastMsg = newMessages[newMessages.length - 1];
          if (lastMsg.role === "assistant") {
            lastMsg.content += chunk;
          }
          return newMessages;
        });
      },
      () => {
        setIsLoading(false);
      }
    );
  };

  if (messages.length === 0) {
    return <Hero onSend={handleSend} />;
  }

  return (
    <main className="flex-1 flex flex-col h-full relative overflow-hidden bg-background-dark">
      {/* Header Sticky */}
      <header className="flex items-center justify-between px-6 py-4 absolute top-0 w-full z-10 bg-gradient-to-b from-background-dark to-transparent">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-dark/50 border border-white/5 backdrop-blur-sm">
          <span className="text-sm font-medium text-gray-400">Model:</span>
          <button className="flex items-center gap-1 text-sm font-semibold text-white hover:text-primary transition-colors">
            Nexus 4.0 
            <span className="material-symbols-outlined text-[16px]">expand_more</span>
          </button>
        </div>
        <div className="flex items-center gap-2">
            <button className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/5 transition-colors">
                <span className="material-symbols-outlined text-[20px]">history</span>
            </button>
        </div>
      </header>

      {/* Chat History List */}
      <div className="flex-1 overflow-y-auto w-full scroll-smooth">
        <div className="max-w-3xl mx-auto px-4 pt-24 pb-48 space-y-8">
          {messages.map((msg, idx) => (
            <div key={idx} className="flex gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg ${
                msg.role === "user" 
                  ? "bg-gradient-to-tr from-primary to-purple-500" 
                  : "bg-gradient-to-br from-primary to-secondary shadow-[0_0_15px_rgba(19,91,236,0.3)]"
              }`}>
                {msg.role === "user" ? "JS" : <span className="material-symbols-outlined text-[16px]">smart_toy</span>}
              </div>
              <div className="flex-1 space-y-2">
                <div className="font-semibold text-sm text-white">
                  {msg.role === "user" ? "You" : "Nexus AI"}
                </div>
                {/* Render Text dengan whitespace-pre-wrap agar enter/paragraf terbaca */}
                <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {msg.content}
                  {/* Cursor Berkedip saat loading */}
                  {msg.role === "assistant" && isLoading && idx === messages.length - 1 && (
                    <span className="inline-block w-1.5 h-4 ml-1 align-middle bg-primary animate-pulse"/>
                  )}
                </div>
              </div>
            </div>
          ))}
          {/* Invisible div untuk target scroll */}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Sticky Input Area */}
      <div className="absolute bottom-0 left-0 w-full bg-background-dark/95 backdrop-blur-xl border-t border-white/5 p-4 z-20">
        <div className="max-w-3xl mx-auto relative">
          <div className={`bg-surface-dark border border-white/10 rounded-xl shadow-lg p-3 transition-all duration-300 relative ${isLoading ? 'opacity-50 cursor-not-allowed' : 'chat-input-glow'}`}>
            <textarea 
              className="w-full bg-transparent border-0 text-white placeholder-gray-500 focus:ring-0 resize-none text-sm py-2 max-h-48 pr-10 outline-none disabled:cursor-not-allowed" 
              placeholder={isLoading ? "Nexus AI is thinking..." : "Ask follow-up questions..."}
              rows={1} 
              disabled={isLoading}
              style={{ minHeight: "44px" }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                   e.preventDefault();
                   handleSend(e.currentTarget.value);
                   e.currentTarget.value = ""; // Clear input
                }
              }}
            />
            <div className="flex items-center justify-between mt-1">
              <div className="flex items-center gap-1">
                <ActionButton icon="add_circle" tooltip="Attach" />
                <ActionButton icon="mic" tooltip="Voice Input" />
              </div>
              <button 
                disabled={isLoading}
                className="bg-primary hover:bg-blue-600 disabled:bg-gray-700 text-white rounded-lg p-1.5 transition-colors shadow-[0_0_10px_rgba(19,91,236,0.3)] flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">arrow_upward</span>
              </button>
            </div>
          </div>
          <p className="text-[10px] text-gray-600 text-center mt-3">
            Nexus AI can make mistakes. Verify important data insights.
          </p>
        </div>
      </div>
    </main>
  );
};

const ActionButton = ({ icon, tooltip }: { icon: string; tooltip: string }) => (
  <button className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-primary transition-colors" title={tooltip}>
    <span className="material-symbols-outlined text-[20px]">{icon}</span>
  </button>
);