export const Hero = ({ onSend }: { onSend: (msg: string) => void }) => {
  const suggestions = [
    {
      icon: "attach_money",
      color: "text-green-400",
      bg: "bg-green-500/10",
      title: "Revenue Deep Dive",
      desc: "Analyze monthly revenue trends and growth.",
    },
    {
      icon: "campaign",
      color: "text-purple-400",
      bg: "bg-purple-500/10",
      title: "Marketing ROI",
      desc: "Compare campaign performance vs spend.",
    },
    {
      icon: "code",
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      title: "SQL Assistant",
      desc: "Generate complex queries from plain english.",
    },
    {
      icon: "group",
      color: "text-orange-400",
      bg: "bg-orange-500/10",
      title: "Cohort Analysis",
      desc: "Visualize user retention over time.",
    },
  ];

  return (
    <div className="flex-1 flex flex-col h-full relative overflow-hidden bg-background-dark">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Header (Top Bar) */}
      <header className="hidden md:flex items-center justify-between px-6 py-4 absolute top-0 w-full z-10">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-dark/50 border border-white/5 backdrop-blur-sm">
          <span className="text-sm font-medium text-gray-400">Model:</span>
          <button className="flex items-center gap-1 text-sm font-semibold text-white hover:text-primary transition-colors">
            Nexus 4.0
            <span className="material-symbols-outlined text-[16px]">expand_more</span>
          </button>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/5 transition-colors">
            <span className="material-symbols-outlined text-[20px]">history</span>
          </button>
        </div>
      </header>

      {/* Main Content Center */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 w-full max-w-4xl mx-auto z-10 mt-10">
        {/* Title Section */}
        <div className="text-center mb-10 space-y-4">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-secondary shadow-[0_0_30px_rgba(19,91,236,0.3)] mb-4">
            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.8261 30.5736C16.7203 29.8826 20.2244 29.4783 24 29.4783C27.7756 29.4783 31.2797 29.8826 34.1739 30.5736C36.9144 31.2278 39.9967 32.7669 41.3563 33.8352L24.8486 7.36089C24.4571 6.73303 23.5429 6.73303 23.1514 7.36089L6.64374 33.8352C8.00331 32.7669 11.0856 31.2278 13.8261 30.5736Z" fill="currentColor"></path>
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold font-display bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-500">
            How can I help you analyze today?
          </h1>
        </div>

        {/* Central Input Box */}
        <div className="w-full max-w-2xl relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-xl opacity-20"></div>
          <div className="bg-surface-dark border border-white/10 rounded-2xl shadow-2xl p-4 chat-input-glow transition-all duration-300 relative z-20">
            <textarea
              className="w-full bg-transparent border-0 text-white placeholder-gray-500 focus:ring-0 resize-none text-base py-3 max-h-48 outline-none"
              placeholder="Ask about your data, generate SQL, or analyze trends..."
              rows={1}
              style={{ minHeight: "56px" }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                   e.preventDefault();
                   onSend(e.currentTarget.value);
                }
              }}
            />
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5">
              <div className="flex items-center gap-2">
                <ActionButton icon="upload_file" tooltip="Upload File" />
                <ActionButton icon="database" tooltip="Select Data Source" />
                <ActionButton icon="grid_view" tooltip="Browse Tools" />
              </div>
              <button className="bg-primary hover:bg-blue-600 text-white rounded-lg p-2 transition-colors shadow-[0_0_10px_rgba(19,91,236,0.3)]">
                <span className="material-symbols-outlined text-[20px]">arrow_upward</span>
              </button>
            </div>
          </div>
        </div>

        {/* Suggestion Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-4xl px-2">
          {suggestions.map((item, idx) => (
            <button
              key={idx}
              className="glass-panel p-4 rounded-xl text-left hover:bg-white/5 hover:border-primary/30 transition-all group"
              onClick={() => onSend(item.title)}
            >
              <div className={`mb-3 w-8 h-8 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform ${item.bg} ${item.color}`}>
                <span className="material-symbols-outlined text-sm">{item.icon}</span>
              </div>
              <h3 className="text-sm font-medium text-white mb-1">{item.title}</h3>
              <p className="text-xs text-gray-500">{item.desc}</p>
            </button>
          ))}
        </div>
      </div>

      <footer className="p-4 text-center">
        <p className="text-xs text-gray-600">
          Nexus AI can make mistakes. Verify important data insights.
        </p>
      </footer>
    </div>
  );
};

const ActionButton = ({ icon, tooltip }: { icon: string; tooltip: string }) => (
  <button className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-primary transition-colors" title={tooltip}>
    <span className="material-symbols-outlined text-[20px]">{icon}</span>
  </button>
);