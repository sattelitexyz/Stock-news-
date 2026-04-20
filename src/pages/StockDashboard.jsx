import { useState, useEffect } from "react";
import { mockStocks, indices } from "../data/mockData";
import Header from "../components/layout/Header";
import TickerBar from "../components/layout/TickerBar";
import IndexCard from "../components/cards/IndexCard";
import StockRow from "../components/cards/StockRow";
import GlowOrb from "../components/ui/GlowOrb";
import { fetchNews } from "../services/newsService"; // ✅ FIXED PATH

export default function StockDashboard() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");
  const [activeTab, setActiveTab] = useState("gainers");
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // ✅ FETCH NEWS
  useEffect(() => {
    async function loadNews() {
      try {
        const data = await fetchNews();
        console.log("API NEWS:", data);

        const formatted = data.slice(0, 10).map((item, index) => ({
          id: index,
          title: item.headline,
          summary: item.summary,
          url: item.url,
          exchange: "ALL"
        }));

        setNews(formatted);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadNews();
  }, []);

  // ✅ USE API NEWS (NOT MOCK)
  const filteredNews =
    filter === "ALL" ? news : news.filter((n) => n.exchange === filter);

  const gainers = mockStocks
    .filter((s) => s.change > 0)
    .sort((a, b) => b.pct - a.pct);

  const losers = mockStocks
    .filter((s) => s.change < 0)
    .sort((a, b) => a.pct - b.pct);

  const displayed = activeTab === "gainers" ? gainers : losers;

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans">

      <Header filter={filter} setFilter={setFilter} time={time} />
      <TickerBar />

      <main className="max-w-7xl mx-auto px-6 py-8">

        {/* Indices */}
        <section className="mb-10">
          <h2 className="text-xs text-gray-500 uppercase mb-4">Market Indices</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {indices.map((idx, i) => (
              <IndexCard key={i} idx={idx} />
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* Stocks */}
          <div className="lg:col-span-2">
            <h2 className="text-xs text-gray-500 uppercase mb-4">Movers</h2>

            <div className="bg-gray-900 rounded-xl">
              {displayed.map((s) => (
                <StockRow key={s.symbol} stock={s} />
              ))}
            </div>
          </div>

          {/* ✅ NEWS SECTION */}
          <div className="lg:col-span-3">
            <h2 className="text-xs text-gray-500 uppercase mb-4">
              Market News
            </h2>

            {/* Loading */}
            {loading && <p className="text-gray-400">Loading news...</p>}

            {/* No Data */}
            {!loading && filteredNews.length === 0 && (
              <p className="text-gray-500">No news available</p>
            )}

            {/* News List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {!loading &&
                filteredNews.map((item) => (
                  <div
                    key={item.id}
                    className="bg-gray-900 border border-gray-800 rounded-lg p-4"
                  >
                    <h3 className="text-sm font-bold">{item.title}</h3>
                    <p className="text-xs text-gray-400 mt-2">
                      {item.summary?.slice(0, 100)}...
                    </p>
                    <a
                      href={item.url}
                      target="_blank"
                      className="text-blue-400 text-xs mt-2 inline-block"
                    >
                      Read more →
                    </a>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}