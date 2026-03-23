import Card3D from "../ui/Card3D";

export default function NewsCard({ item }) {
  return (
    <Card3D>
      <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 hover:border-gray-700 transition duration-300 h-full flex flex-col justify-between">
        
        {/* Top */}
        <div>
          <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">
            {item.source || "Market News"}
          </p>

          <h2 className="text-sm font-bold text-white leading-snug line-clamp-2">
            {item.title}
          </h2>
        </div>

        {/* Bottom */}
        <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
          <span>{item.time || "Just now"}</span>

          {item.url && (
            <a
              href={item.url}
              target="_blank"
              className="text-emerald-400 hover:text-emerald-300 font-semibold"
            >
              Read →
            </a>
          )}
        </div>

      </div>
    </Card3D>
  );
}