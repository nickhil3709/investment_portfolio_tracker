import yfinance as yf
import pandas as pd
import numpy as np
from sklearn.metrics import mean_absolute_error, mean_squared_error
from xgboost import XGBRegressor

def fetch_data(symbol):
    df = yf.download(symbol, period='1y', interval='1d', group_by="ticker", auto_adjust=True)

    # Handle MultiIndex case
    if isinstance(df.columns, pd.MultiIndex):
        if symbol in df.columns.get_level_values(0):
            df = df[symbol]
        else:
            raise ValueError(f"Symbol '{symbol}' not found in downloaded DataFrame columns")

    if 'Close' not in df.columns:
        raise ValueError(f"'Close' column not found in the data for {symbol}")

    df = df[['Close']].dropna()
    df.index = pd.to_datetime(df.index)

    # Add indicators
    df['Return'] = df['Close'].pct_change()
    df['MA7'] = df['Close'].rolling(window=7).mean()
    df['MA21'] = df['Close'].rolling(window=21).mean()
    df['STD'] = df['Close'].rolling(window=7).std()

    df.dropna(inplace=True)
    return df


def prepare_features(prices, window=5):
    df = pd.DataFrame(prices)
    df.columns = ['Close']
    for i in range(1, window + 1):
        df[f'lag_{i}'] = df['Close'].shift(i)
    df.dropna(inplace=True)
    return df

def predict_with_xgboost(prices, days_ahead=30, window=5):
    df = prepare_features(prices, window)
    X = df.drop('Close', axis=1)
    y = df['Close']

    model = XGBRegressor(objective='reg:squarederror', n_estimators=300,max_depth=5, learning_rate=0.05)
    model.fit(X, y)

    forecast = []
    last_row = X.iloc[-1].values.tolist()

    for _ in range(days_ahead):
        pred = model.predict([last_row])[0]
        forecast.append(pred)
        last_row = [pred] + last_row[:-1]  # shift window

    return forecast

def predict_stock(symbol):
    df = fetch_data(symbol)
    latest_price = round(df['Close'].iloc[-1], 2)

    # XGBoost prediction
    forecast_7d = train_xgboost_model(df, days_ahead=7)
    forecast_30d = train_xgboost_model(df, days_ahead=30)

    # Backtest XGBoost (last 30 days)
    test_actual = df['Close'][-30:]
    test_pred = train_xgboost_model(df, days_ahead=30)

    mae = mean_absolute_error(test_actual, test_pred)
    rmse = mean_squared_error(test_actual, test_pred) ** 0.5

    return {
        "current_price": latest_price,
        "predicted_price_7d": round(float(np.mean(forecast_7d)), 2),
        "predicted_price_30d": round(float(np.mean(forecast_30d)), 2),
        "backtest_mae": round(mae, 2),
        "backtest_rmse": round(rmse, 2),
        "backtest_actual": [round(float(x), 2) for x in test_actual],
        "backtest_predicted": [round(float(x), 2) for x in test_pred],
        "backtest_error": None
    }

def train_xgboost_model(df, days_ahead=1):
    df = df.copy()
    for i in range(1, 6):  # 5 lag days
        df[f'lag_{i}'] = df['Close'].shift(i)

    df.dropna(inplace=True)
    
    X = df.drop(columns=['Close'])
    y = df['Close']

    X_train, y_train = X[:-days_ahead], y[:-days_ahead]
    X_test = X[-days_ahead:]

    model = XGBRegressor(n_estimators=100, learning_rate=0.05)
    model.fit(X_train, y_train)
    
    y_pred = model.predict(X_test)
    return y_pred

def backtest_xgboost(prices, days=30):
    try:
        train = prices[:-days]
        test = prices[-days:]

        forecast = predict_with_xgboost(train, days_ahead=days)

        mae = mean_absolute_error(test, forecast)
        rmse = mean_squared_error(test, forecast) ** 0.5

        return {
            "mae": round(mae, 2),
            "rmse": round(rmse, 2),
            "actual": [round(v, 2) for v in test],
            "predicted": [round(v, 2) for v in forecast]
        }
    except Exception as e:
        print("Backtest error:", e)
        return {
            "mae": None,
            "rmse": None,
            "actual": [],
            "predicted": [],
            "error": str(e)
        }
