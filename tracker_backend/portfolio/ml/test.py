import yfinance as yf
import pandas as pd
import numpy as np

def fetch_data(symbol):
    df = yf.download(symbol, period='1y', interval='1d', group_by="ticker", auto_adjust=True)
    print("Downloaded df.columns:\n", df.columns)
    print(df.head())

fetch_data('AAPL')  # Example call to test the function