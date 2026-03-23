import { useState, useEffect } from "react";
import { mockStocks, mockNews, indices } from "../data/mockData";
import Header from "../components/layout/Header";
import TickerBar from "../components/layout/TickerBar";
import IndexCard from "../components/cards/IndexCard";
import StockRow from "../components/cards/StockRow";
import NewsCard from "../components/cards/NewsCard";
import GlowOrb from "../components/ui/GlowOrb";

export default function StockDashboard() {
  const [filter, setFilter] = useState("ALL");
  const [activeTab, setActiveTab] = useState("gainers");
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const filteredNews =
    filter === "ALL" ? mockNews : mockNews.filter((n) => n.exchange === filter);
  const gainers = mockStocks.filter((s) => s.change > 0).sort((a, b) => b.pct - a.pct);
  const losers = mockStocks.filter((s) => s.change < 0).sort((a, b) => a.pct - b.pct);
  const displayed = activeTab === "gainers" ? gainers : losers;

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans relative overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@700;800;900&display=swap');
        * { font-family: 'Syne', sans-serif; }
        .font-mono { font-family: 'Space Mono', monospace !important; }
        @keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-ticker { animation: ticker 30s linear infinite; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        .fade-up { animation: fadeUp 0.5s ease forwards; }
        .fade-up-1 { animation-delay: 0.1s; opacity: 0; }
        .fade-up-2 { animation-delay: 0.2s; opacity: 0; }
        .fade-up-3 { animation-delay: 0.3s; opacity: 0; }
        .fade-up-4 { animation-delay: 0.4s; opacity: 0; }
      `}</style>

      <GlowOrb color="#6366f1" style={{ width: 600, height: 600, top: -200, left: -200 }} />
      <GlowOrb color="#0ea5e9" style={{ width: 400, height: 400, top: 100, right: -100 }} />
      <GlowOrb color="#10b981" style={{ width: 300, height: 300, bottom: 200, left: "30%" }} />

      <Header filter={filter} setFilter={setFilter} time={time} />
      <TickerBar />

      <main className="max-w-7xl mx-auto px-6 py-8 relative z-10">

        {/* Indices */}
        <section className="mb-10 fade-up fade-up-1">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-xs font-bold tracking-widest text-gray-500 uppercase">Market Indices</h2>
            <div className="flex-1 h-px bg-gray-800" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {indices.map((idx, i) => <IndexCard key={i} idx={idx} />)}
          </div>
        </section>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* Stocks */}
          <div className="lg:col-span-2 fade-up fade-up-2">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-xs font-bold tracking-widest text-gray-500 uppercase">Movers</h2>
              <div className="flex-1 h-px bg-gray-800" />
              <div className="flex bg-gray-900 rounded-lg p-0.5 border border-gray-800">
                {["gainers", "losers"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1 rounded-md text-xs font-bold capitalize transition-all duration-200 ${
                      activeTab === tab
                        ? tab === "gainers"
                          ? "bg-emerald-600 text-white"
                          : "bg-red-700 text-white"
                        : "text-gray-500 hover:text-gray-300"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            <div className="bg-gray-900/60 border border-gray-800 rounded-2xl overflow-hidden backdrop-blur-sm">
              <div className="divide-y divide-gray-800/60">
                {displayed.map((s, i) => <StockRow key={s.symbol} stock={s} i={i} />)}
              </div>
            </div>

            {/* Market Breadth */}
            <div className="mt-6 bg-gray-900/60 border border-gray-800 rounded-2xl p-5 backdrop-blur-sm">
              <h3 className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-4">Market Breadth</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                {[
                  { label: "Advances", val: "1,247", color: "text-emerald-400" },
                  { label: "Declines", val: "891", color: "text-red-400" },
                  { label: "Unchanged", val: "134", color: "text-yellow-400" },
                ].map((m) => (
                  <div key={m.label}>
                    <p className={`text-2xl font-black ${m.color}`}>{m.val}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{m.label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 h-2 rounded-full bg-gray-800 overflow-hidden flex">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: "55%" }} />
                <div className="bg-red-500 h-full" style={{ width: "39%" }} />
                <div className="bg-yellow-500 h-full rounded-full" style={{ width: "6%" }} />
              </div>
            </div>
          </div>

          {/* News */}
          <div className="lg:col-span-3 fade-up fade-up-3">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-xs font-bold tracking-widest text-gray-500 uppercase">Market News</h2>
              <div className="flex-1 h-px bg-gray-800" />
              <span className="text-xs text-gray-600 font-mono">{filteredNews.length} stories</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredNews.map((item) => (
  <div key={item.id}>{item.title}</div>
))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-800 fade-up fade-up-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-600 font-mono">
              Data for demonstration only. Not financial advice. © 2026 MarketPulse
            </p>
            <div className="flex items-center gap-4 text-xs text-gray-600">
              {["NSE", "BSE", "SEBI", "RBI"].map((tag) => (
                <span key={tag} className="hover:text-gray-400 cursor-pointer transition-colors">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}