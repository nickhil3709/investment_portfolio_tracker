import requests
import os

ALPHA_VANTAGE_API_KEY = "A30AYEAE7KHTIULS"

def fetch_stock_price(symbol):
    url = f"https://www.alphavantage.co/query"
    params = {
        "function": "GLOBAL_QUOTE",
        "symbol": symbol,
        "apikey": ALPHA_VANTAGE_API_KEY
    }

    try:
       response = requests.get(url,params=params)
       data = response.json()
       price = data["Global Quote"].get("05. price")
       return float(price) if price else None

    except Exception as e:
         print(f"Error fetching price for {symbol}: {e}")
         return None