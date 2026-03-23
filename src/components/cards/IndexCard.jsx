import Card3D from "../ui/Card3D";

export default function IndexCard({ idx }) {
  return (
    <Card3D>
      <div
        className={`relative overflow-hidden rounded-xl border p-4 bg-gray-900 ${
          idx.up ? "border-emerald-800/50" : "border-red-900/50"
        }`}
      >
        <div className={`absolute inset-0 opacity-5 ${idx.up ? "bg-emerald-400" : "bg-red-400"}`} />
        <div
          className="absolute top-0 right-0 w-20 h-20 rounded-full blur-2xl opacity-10"
          style={{
            background: idx.up ? "#34d399" : "#f87171",
            transform: "translate(40%, -40%)",
          }}
        />
        <p className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-1">
          {idx.name}
        </p>
        <p className="text-xl font-black text-white font-mono">{idx.value}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className={`text-sm font-bold ${idx.up ? "text-emerald-400" : "text-red-400"}`}>
            {idx.change}
          </span>
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
              idx.up
                ? "bg-emerald-900/50 text-emerald-300"
                : "bg-red-900/50 text-red-300"
            }`}
          >
            {idx.pct}
          </span>
        </div>
      </div>
    </Card3D>
  );
}