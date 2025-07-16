
# 📊 Investment Portfolio Tracker

A full-stack web application that helps users track investments, simulate SIP growth, analyze portfolio performance, and get rebalancing recommendations using machine learning.

## 🌐 Live Demo

> *Coming Soon or add your deployed link here*

---

## 📌 Features

✅ **User Authentication**
✅ **Investment CRUD** (Create, Read, Update, Delete)
✅ **Portfolio Summary** (Total Invested, Current Value, PnL)
✅ **Asset Allocation Visualization** (Pie Chart)
✅ **SIP Calculator** with yearly projections
✅ **Stock Price Predictions** (ARIMA / XGBoost models)
✅ **Rebalancing Recommendations** using ML logic
✅ **Responsive UI** built with React + CSS

---

## 🖼️ Screenshots

| Dashboard                                 | SIP Calculator                | Predictions                                   |
| ----------------------------------------- | ----------------------------- | --------------------------------------------- |
| ![dashboard](./screenshots/dashboard.png) | ![sip](./screenshots/sip.png) | ![predictions](./screenshots/predictions.png) |

---

## 🏗️ Tech Stack

### ⚙️ Backend

* **Python** (3.10+)
* **Django REST Framework**
* **Pandas, NumPy, Scikit-learn**
* **ARIMA, XGBoost** for price prediction
* **Custom Rebalancing Logic**

### 💻 Frontend

* **React.js**
* **Chart.js** for pie chart visualizations
* **Axios** for API requests
* **Responsive CSS (No Tailwind)**

---

## 🚀 Setup Instructions

### 📦 Backend (Django)

1. **Clone the repo**:

   ```bash
   git clone https://github.com/your-username/investment-portfolio-tracker.git
   cd investment-portfolio-tracker/backend
   ```

2. **Create virtual environment & install packages**:

   ```bash
   python -m venv env
   source env/bin/activate  # or `env\Scripts\activate` on Windows
   pip install -r requirements.txt
   ```

3. **Run migrations**:

   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

4. **Run server**:

   ```bash
   python manage.py runserver
   ```

---

### 💻 Frontend (React)

1. **Navigate to frontend**:

   ```bash
   cd ../frontend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Create `.env` file**:

   ```env
   REACT_APP_API_BASE_URL=http://127.0.0.1:8000/api/
   ```

4. **Run frontend**:

   ```bash
   npm start
   ```

---

## 🧠 ML Functionality

* **ARIMA/XGBoost** based price prediction (`/predict/`)
* **Portfolio Rebalancing** based on target stock-to-bond ratios
* **SIP Growth Projection** using compound interest formulas

---

## 📁 Folder Structure

```
investment-portfolio-tracker/
├── backend/
│   └── portfolio/ (Django App)
├── frontend/
│   └── src/components/
│       ├── Dashboard.jsx
│       ├── SIPCalculator.jsx
│       ├── InvestmentForm.jsx
│       └── PredictionResults.jsx
```

---

## 🛡️ Authentication

* JWT-based authentication via Django REST Framework SimpleJWT
* Frontend persists auth tokens in `localStorage`

---

## 📊 API Endpoints

| Method | Endpoint                  | Description                 |
| ------ | ------------------------- | --------------------------- |
| POST   | `/api/token/`             | Obtain JWT tokens           |
| GET    | `/portfolio/summary/`     | Portfolio summary data      |
| POST   | `/portfolio/investments/` | Add new investment          |
| POST   | `/portfolio/predict/`     | Predict future stock prices |
| POST   | `/portfolio/rebalance/`   | Get rebalancing suggestions |
| POST   | `/portfolio/sip/`         | Run SIP simulation          |

---

## ✅ TODO / Future Scope

* 📈 Add more technical indicators (MACD, RSI)
* 💡 Add dark mode and light mode toggle
* 🌍 Deploy using Vercel (frontend) & Render/Heroku (backend)
* 📲 Add PWA capabilities (Progressive Web App)
* 🔔 Notification system for SIP reminders

---




