import MiniSparkline from "../ui/MiniSparkline";

export default function StockRow({ stock, i }) {
  const up = stock.change >= 0;
  return (
    <div
      className="grid items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800/60 transition-all duration-200 group"
      style={{ gridTemplateColumns: "2rem 1fr auto auto auto auto" }}
    >
      <span className="text-gray-600 text-xs font-mono">
        {String(i + 1).padStart(2, "0")}
      </span>
      <div>
        <p className="text-sm font-bold text-white tracking-wide">{stock.symbol}</p>
        <p className="text-xs text-gray-500 truncate">{stock.name}</p>
      </div>
      <span
        className={`text-xs px-1.5 py-0.5 rounded font-bold ${
          stock.exchange === "NSE"
            ? "bg-blue-900/50 text-blue-300"
            : "bg-orange-900/50 text-orange-300"
        }`}
      >
        {stock.exchange}
      </span>
      <MiniSparkline up={up} />
      <div className="text-right">
        <p className="text-sm font-black text-white font-mono">
          ₹{stock.price.toLocaleString()}
        </p>
        <p className="text-xs text-gray-500">Vol {stock.volume}</p>
      </div>
      <div className={`text-right min-w-16 ${up ? "text-emerald-400" : "text-red-400"}`}>
        <p className="text-xs font-bold">
          {up ? "+" : ""}
          {stock.change}
        </p>
        <p className="text-xs font-bold">
          {up ? "+" : ""}
          {stock.pct}%
        </p>
      </div>
    </div>
  );
}