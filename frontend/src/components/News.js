import React, { useState, useEffect, useMemo } from "react";

const News = () => {
  const [newsData, setNewsData] = useState([]);
  const [error, setError] = useState("");

  // Memoizing the tickers array to avoid unnecessary re-renders
  const tickers = useMemo(() => ['AAPL', 'TSLA', 'KO', 'MSFT', 'JNJ', 'PFE', 'AMZN', 'JPM', 'BAC', 'JCP', 'BTU', 'AMRN', 'WFC', 'RF', 'CCL', 'FLG', 'CSAN', 'EVO'], []);

  // Hardcoded sentiment for each stock
  const stockSentiment = {
    AAPL: "Buy",
    TSLA: "Hold",
    KO: "Sell",
    MSFT: "Buy",
    JNJ: "Hold",
    PFE: "Sell",
    AMZN: "Buy",
    JPM: "Hold",
    BAC: "Sell",
    JCP: "Hold",
    BTU: "Buy",
    AMRN: "Buy",
    WFC: "Sell",
    RF: "Hold",
    CCL: "Sell",
    FLG: "Buy",
    CSAN: "Hold",
    EVO: "Buy",
  };

  // Function to determine sentiment color
  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case "Buy":
        return "green"; // Green for Buy
      case "Sell":
        return "red"; // Red for Sell
      case "Hold":
        return "grey"; // Grey for Hold
      default:
        return "black"; // Default color
    }
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const API_KEY = "cu1d2npr01qqr3sghu80cu1d2npr01qqr3sghu8g"; // Replace with your actual Finnhub API key
        let allNews = [];

        // Loop through each ticker and fetch news
        for (let ticker of tickers) {
          const from = "2024-01-01";
          const to = "2024-03-01";
          const API_URL = `https://finnhub.io/api/v1/company-news?symbol=${ticker}&from=${from}&to=${to}&token=${API_KEY}`;

          const response = await fetch(API_URL);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          
          // Filter to get only the first news item for each stock
          if (data && data.length > 0) {
            const firstNewsItem = data[0];
            firstNewsItem.ticker = ticker; // Add the ticker to the news item
            allNews.push(firstNewsItem);
          }
        }

        setNewsData(allNews);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message || "Something went wrong.");
      }
    };

    fetchNews();
  }, [tickers]);

  return (
    <div className="news-container">
      <h2>Latest News</h2>
      {error && <p className="error-message">{error}</p>}

      {/* News List Container */}
      <div className="news-list-container">
        <div className="news-list">
          {newsData.map((news, index) => {
            const ticker = news.ticker; // Ticker from the news item
            const sentiment = stockSentiment[ticker] || "Unknown Sentiment"; // Use the sentiment for the ticker

            // Determine the color for the sentiment
            const sentimentColor = getSentimentColor(sentiment);

            return (
              <div key={index} className="news-item">
                <div className="news-image-container">
                  {/* Set a fixed size for the image */}
                  {news.image && (
                    <img
                      src={news.image}
                      alt={news.headline}
                      className="news-image"
                      style={{ width: "100px", height: "100px", objectFit: "cover" }}
                    />
                  )}
                </div>
                <div className="news-content">
                  <h3>{news.headline}</h3>
                  <p className="news-date">
                    Published on: {new Date(news.datetime * 1000).toLocaleDateString()}
                  </p>
                  <p className="news-summary">{news.summary}</p>
                  <a
                    href={news.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="news-link"
                  >
                    Read Full Article
                  </a>
                  {/* Display Stock Name and Sentiment */}
                  <div className="stock-info">
                    <p><strong>Stock:</strong> {ticker}</p>
                    <p style={{ color: sentimentColor }}><strong>Sentiment:</strong> {sentiment}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default News;
