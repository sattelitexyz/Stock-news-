// /services/newsService.js

const API_KEY = import.meta.env.VITE_FINNHUB_API;

export async function fetchNews() {
  try {
    const res = await fetch(
      `https://finnhub.io/api/v1/news?category=general&token=YOUR_API_KEY`
    );

    if (!res.ok) throw new Error("Failed to fetch");

    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}