import { mockStocks } from "../../data/mockData";

export default function TickerBar() {
  const items = [...mockStocks, ...mockStocks];
  return (
    <div className="bg-gray-950 border-b border-gray-800 overflow-hidden py-2">
      <div className="flex animate-ticker whitespace-nowrap">
        {items.map((s, i) => (
          <span key={i} className="inline-flex items-center gap-2 px-6 text-xs font-mono">
            <span className="text-gray-400 font-semibold tracking-wider">{s.symbol}</span>
            <span className="text-white">₹{s.price.toLocaleString()}</span>
            <span className={s.change >= 0 ? "text-emerald-400" : "text-red-400"}>
              {s.change >= 0 ? "▲" : "▼"} {Math.abs(s.pct)}%
            </span>
            <span className="text-gray-700">|</span>
          </span>
        ))}
      </div>
    </div>
  );
}