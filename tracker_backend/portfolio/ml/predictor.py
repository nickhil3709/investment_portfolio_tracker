import yfinance as yf
import pandas as pd
import numpy as np
from statsmodels.tsa.arima.model import ARIMA

def fetch_data(symbol):
    df = yf.download(symbol, period='1y', interval='1d')
    df = df[['Close']].dropna()
    df.index = pd.to_datetime(df.index)  # ✅ Ensure proper DateTime index
    return df['Close']


def predict_with_arima(prices, days_ahead):
    try:
        model = ARIMA(prices, order=(5, 1, 0))
        model_fit = model.fit()
        forecast = model_fit.forecast(steps=days_ahead)  # ✅ Correct param
        return forecast
    except Exception as e:
        print("ARIMA Error:", e)
        return [None] * days_ahead  # ✅ Proper fallback

def predict_stock(symbol):
    try:
        prices = fetch_data(symbol)
        latest_price = round(float(prices.iloc[-1]), 2)

        forecast_7d = predict_with_arima(prices, 7)
        forecast_30d = predict_with_arima(prices, 30)

        # Safely compute predictions
        predicted_7d = round(float(np.mean(forecast_7d)), 2) if forecast_7d is not None and not pd.isna(forecast_7d).any() else None
        predicted_30d = round(float(np.mean(forecast_30d)), 2) if forecast_30d is not None and not pd.isna(forecast_30d).any() else None

        return {
            "current_price": latest_price,
            "predicted_price_7d": predicted_7d,
            "predicted_price_30d": predicted_30d
        }

    except Exception as e:
        print(f"Prediction error for {symbol}:", e)
        return {"error": str(e)}
