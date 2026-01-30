export const DashboardPanel = () => {
  return (
    <aside className="w-full md:w-[400px] lg:w-[450px] bg-[#08080c] border-l border-glass-border flex flex-col h-full overflow-y-auto relative z-20 transition-all duration-300">
      <div className="p-6 space-y-6">
        
        {/* Header Dashboard */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-display font-bold text-white mb-1">Analysis Dashboard</h1>
            <p className="text-xs text-gray-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Live Data • Updated 2m ago
            </p>
          </div>
          <button className="p-2 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition-colors">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* 3 Kartu Statistik (Cards) */}
        <div className="grid grid-cols-2 gap-3">
          {/* Card 1: Sales */}
          <div className="glass-panel p-4 rounded-xl border-l-4 border-l-primary relative overflow-hidden group col-span-2">
            <div className="absolute right-0 top-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-5xl text-primary">payments</span>
            </div>
            <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-1">Total Sales</p>
            <div className="flex items-baseline gap-2 mb-2">
              <h3 className="text-2xl font-bold text-white">$2.4M</h3>
              <span className="text-xs font-medium text-green-400 flex items-center bg-green-400/10 px-1.5 py-0.5 rounded">
                <span className="material-symbols-outlined text-[12px] mr-0.5">trending_up</span>
                +12.5%
              </span>
            </div>
            {/* Progress Bar */}
            <div className="w-full bg-gray-800 h-1 rounded-full mt-1 overflow-hidden">
              <div className="bg-primary h-full rounded-full" style={{ width: "75%" }}></div>
            </div>
          </div>

          {/* Card 2: Growth */}
          <div className="glass-panel p-3 rounded-xl border-l-4 border-l-secondary relative overflow-hidden">
             <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-1">Growth</p>
             <h3 className="text-xl font-bold text-white">18.2%</h3>
             <span className="text-[10px] text-green-400 flex items-center mt-1">
                <span className="material-symbols-outlined text-[12px] mr-0.5">trending_up</span> +4.1%
             </span>
          </div>

           {/* Card 3: Conversion */}
           <div className="glass-panel p-3 rounded-xl border-l-4 border-l-accent-cyan relative overflow-hidden">
             <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-1">Conv. Rate</p>
             <h3 className="text-xl font-bold text-white">4.8%</h3>
             <span className="text-[10px] text-red-400 flex items-center mt-1">
                <span className="material-symbols-outlined text-[12px] mr-0.5">trending_down</span> -0.5%
             </span>
          </div>
        </div>

        {/* Dummy Chart Area (Visual Only) */}
        <div className="glass-panel p-5 rounded-xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-semibold text-white">Revenue by Region</h3>
            <select className="bg-surface-hover border border-glass-border text-[10px] text-gray-300 rounded px-2 py-1 outline-none">
              <option>Last 30 Days</option>
            </select>
          </div>
          
          {/* Simple CSS Bar Chart */}
          <div className="relative h-40 w-full flex items-end justify-between gap-2 px-2">
             {/* Garis Grid Background */}
             <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                {[...Array(5)].map((_, i) => <div key={i} className="w-full h-px bg-white"></div>)}
             </div>
             
             {/* Bars */}
             <Bar height="85%" label="North" color="bar-gradient" value="$850k" />
             <Bar height="45%" label="South" color="bar-gradient-alt" value="$450k" />
             <Bar height="65%" label="East" color="bar-gradient" value="$650k" />
             <Bar height="35%" label="West" color="bar-gradient-alt" value="$350k" />
          </div>
        </div>

        {/* Top Products Table */}
        <div className="glass-panel rounded-xl overflow-hidden">
            <div className="p-4 border-b border-glass-border">
                <h3 className="text-sm font-semibold text-white">Top Products</h3>
            </div>
            <table className="w-full text-left">
                <thead className="bg-white/5 text-[10px] text-gray-400 uppercase">
                    <tr>
                        <th className="p-3 font-medium">Product</th>
                        <th className="p-3 font-medium text-right">Rev</th>
                    </tr>
                </thead>
                <tbody className="text-xs divide-y divide-white/5">
                    <TableRow name="Enterprise Plan" rev="$1.2M" />
                    <TableRow name="API Credits" rev="$856k" />
                    <TableRow name="Consulting" rev="$320k" />
                </tbody>
            </table>
        </div>

      </div>
    </aside>
  );
};

// Komponen Kecil Helper
const Bar = ({ height, label, color, value }: any) => (
    <div className="flex flex-col items-center flex-1 h-full justify-end group cursor-pointer">
        <div className={`w-full max-w-[40px] ${color} rounded-t-sm relative transition-all duration-300 hover:brightness-110`} style={{ height }}>
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-surface-hover border border-glass-border text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                {value}
            </div>
        </div>
        <span className="text-[10px] text-gray-400 mt-2 font-medium">{label}</span>
    </div>
);

const TableRow = ({ name, rev }: any) => (
    <tr className="hover:bg-white/5 transition-colors">
        <td className="p-3 text-white font-medium">{name}</td>
        <td className="p-3 text-white text-right">{rev}</td>
    </tr>
);