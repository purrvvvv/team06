import finnhub
import nltk
from nltk.sentiment import SentimentIntensityAnalyzer
import time
import schedule
import threading
from datetime import datetime, timedelta
import os
import requests

# Set SSL_CERT_FILE environment variable if it's not already set



# Set up the Finnhub client with your API key
api_key = 'cu1i3r1r01qqr3sgs600cu1i3r1r01qqr3sgs60g'
finnhub_client = finnhub.Client(api_key)

# Initialize NLTK's SentimentIntensityAnalyzer
nltk.download('vader_lexicon')
sia = SentimentIntensityAnalyzer()

# List of stock symbols
stocks = ['AAPL', 'TSLA', 'KO', 'MSFT', 'JNJ', 'PFE', 'AMZN', 'JPM', 'BAC', 'JCP', 'BTU', 'AMRN', 'WFC', 'RF', 'CCL', 'FLG', 'CSAN', 'EVO']

# Dictionary to store news data for each stock (news will be updated every 2 hours)
stock_news_data = {stock: [] for stock in stocks}

# Function to fetch news and calculate sentiment for each stock
def get_sentiment(stock_symbol):
    to_time = datetime.utcnow()
    from_time = datetime.utcnow() - timedelta(hours=24)
    to_str = to_time.strftime('%Y-%m-%d')
    from_str = from_time.strftime('%Y-%m-%d')

    # Fetch news related to the stock for the last 24 hours
    news = finnhub_client.company_news(stock_symbol, _from=from_str, to=to_str)

    stock_news_data[stock_symbol].extend(news)

    if not stock_news_data[stock_symbol]:
        return f"No recent news for {stock_symbol}. Defaulting to HOLD recommendation."

    sentiment_scores = []
    total_weight = 0
    for article in stock_news_data[stock_symbol]:
        title = article['headline']
        description = article['summary']
        article_time = datetime.utcfromtimestamp(article['datetime'])
        text = title + " " + description
        sentiment = sia.polarity_scores(text)
        time_diff = to_time - article_time
        weight = max(1, (24 - time_diff.total_seconds() / 3600))
        sentiment_scores.append(sentiment['compound'] * weight)
        total_weight += weight

    weighted_avg_sentiment = sum(sentiment_scores) / total_weight if total_weight > 0 else 0

    def get_stock_recommendation(sentiment_score):
        if sentiment_score > 0.6:
            return "Strong Buy"
        elif sentiment_score > 0.3:
            return "Buy"
        elif sentiment_score > -0.1:
            return "Hold"
        elif sentiment_score > -0.3:
            return "Sell"
        else:
            return "Strong Sell"

    recommendation = get_stock_recommendation(weighted_avg_sentiment)
    return f"Stock: {stock_symbol}, Recommendation: {recommendation}, Sentiment: {weighted_avg_sentiment}"

# Running the sentiment for a stock
if __name__ == "__main__":
    for stock in stocks:
        result = get_sentiment(stock)
        print(result)
