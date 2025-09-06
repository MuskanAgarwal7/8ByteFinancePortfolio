
#  Stock Portfolio Dashboard — Backend (API Server)

This folder contains the **Node.js + Express backend** for the Stock Portfolio Dashboard. It handles API requests to fetch financial data, process calculations, and serve the frontend with structured responses.

---

## Tech Stack

- **Node.js** — JavaScript runtime
- **Express.js** — Lightweight web framework
- **Axios ** — For API requests or web scraping
- **yahoo-finance2** - for CMP,LATEST EARNING ,PE RATIO
- **cors** — Enable cross-origin access for the frontend

---



## Setup Instructions

1. Navigate to backend folder:

```bash
cd backend
````

2. Install dependencies:

```bash
npm install
```



3. Run the server:

```bash
npm start

```

---

## Features

* Fetch current stock data (CMP, P/E, Earnings)
* API endpoints for dashboard data
* Clean service-controller-route separation


---

## API Routes 

```
GET /api/stock/     → Fetch stock data

```

---

##  Future Enhancements

* Data caching
* Rate limiting
* Stock performance charts
