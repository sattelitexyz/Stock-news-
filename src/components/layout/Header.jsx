export default function Header({ filter, setFilter, time }) {
  return (
    <header className="relative z-10 border-b border-gray-800 bg-gray-950/80 backdrop-blur-xl sticky top-0">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-lg font-black shadow-lg shadow-indigo-900/50">
            ₹
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tight leading-none">MarketPulse</h1>
            <p className="text-xs text-gray-500 font-mono">NSE · BSE · LIVE</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 bg-gray-900 border border-gray-700 rounded-lg px-3 py-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono text-gray-300">
              {time.toLocaleTimeString("en-IN")} IST
            </span>
          </div>
          <div className="flex gap-1">
            {["ALL", "NSE", "BSE"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
                  filter === f
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/50"
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}