export const Sidebar = () => {
  return (
    <aside className="w-[280px] bg-black/40 border-r border-glass-border flex flex-col h-full flex-shrink-0 relative z-20 transition-all duration-300 hidden md:flex">
      {/* Tombol New Chat */}
      <div className="p-3">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-surface-hover text-sm text-gray-200 transition-colors border border-transparent hover:border-glass-border group">
          <div className="p-1 rounded bg-white text-black group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-sm">add</span>
          </div>
          <span className="font-medium">New Chat</span>
          <span className="ml-auto text-xs text-gray-500">⌘N</span>
        </button>
      </div>

      {/* List Menu (Scrollable) */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-6">
        {/* Section 1 */}
        <div>
          <h3 className="px-3 text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
            Recent Analytics
          </h3>
          <div className="space-y-0.5">
            <NavItem 
              icon="analytics" 
              label="Q3 Revenue Deep Dive" 
              active 
              iconColor="text-primary" 
            />
            <NavItem icon="table_chart" label="Marketing ROI Analysis" />
            <NavItem icon="query_stats" label="Customer Churn Prediction" />
          </div>
        </div>

        {/* Section 2 */}
        <div>
          <h3 className="px-3 text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
            Yesterday
          </h3>
          <div className="space-y-0.5">
            <NavItem icon="chat_bubble_outline" label="SQL Query Generator" />
            <NavItem icon="chat_bubble_outline" label="Visualize JSON Data" />
          </div>
        </div>

        {/* Section 3 */}
        <div>
          <h3 className="px-3 text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
            Previous 7 Days
          </h3>
          <div className="space-y-0.5">
            <NavItem icon="code" label="Python Data Cleaning" />
            <NavItem icon="functions" label="Excel Formula Helper" />
            <NavItem icon="troubleshoot" label="Competitor Analysis Q2" />
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

const NavItem = ({ 
  icon, 
  label, 
  active = false, 
  iconColor = "" 
}: { 
  icon: string; 
  label: string; 
  active?: boolean;
  iconColor?: string;
}) => {
  return (
    <a
      href="#"
      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
        active
          ? "bg-surface-hover text-white border border-glass-border ring-1 ring-primary/20"
          : "text-gray-400 hover:text-white hover:bg-surface-hover"
      }`}
    >
      <span className={`material-symbols-outlined text-[18px] ${iconColor}`}>
        {icon}
      </span>
      <span className="truncate">{label}</span>
    </a>
  );
};