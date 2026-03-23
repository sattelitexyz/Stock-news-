import Card3D from "../ui/Card3D";

const sentimentColors = {
  positive: "text-emerald-400 bg-emerald-900/30 border-emerald-800/50",
  negative: "text-red-400 bg-red-900/30 border-red-800/50",
  neutral: "text-yellow-400 bg-yellow-900/30 border-yellow-800/50",
};

const sentimentDot = {
  positive: "bg-emerald-400",
  negative: "bg-red-400",
  neutral: "bg-yellow-400",
};

export default function NewsCard({ item }) {
  return (
    <Card3D>
      <div className="group relative overflow-hidden rounded-xl border border-gray-800 bg-gray-900/80 p-4 hover:border-gray-600 transition-all duration-300 h-full">
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background:
              "radial-gradient(circle at 50% 0%, rgba(99,102,241,0.06), transparent 70%)",
          }}
        />
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-bold border ${sentimentColors[item.sentiment]}`}
            >
              {item.tag}
            </span>
            <span
              className={`text-xs px-2 py-0.5 rounded font-bold ${
                item.exchange === "NSE"
                  ? "bg-blue-900/40 text-blue-300"
                  : "bg-orange-900/40 text-orange-300"
              }`}
            >
              {item.exchange}
            </span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${sentimentDot[item.sentiment]}`} />
            <span className="text-xs text-gray-500 font-mono">{item.time}</span>
          </div>
        </div>
        <p className="text-sm font-semibold text-gray-200 leading-snug group-hover:text-white transition-colors">
          {item.headline}
        </p>
        <div className="mt-3 flex items-center gap-1 text-xs text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">
          <span>Read more</span>
          <span>→</span>
        </div>
      </div>
    </Card3D>
  );
}