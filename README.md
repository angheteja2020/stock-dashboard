# 📊 Stock Dashboard - September 2025

A beautiful and interactive stock price dashboard built with React, Vite, and Tailwind CSS v4. This application visualizes adjusted close prices for selected stocks (MOS, TECK, PG) and compares them against the S&P 500 benchmark.

![Stock Dashboard](https://img.shields.io/badge/React-18.2-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8)
![Vite](https://img.shields.io/badge/Vite-5.0-646cff)

## ✨ Features

- **📈 Interactive Price Table** - Displays adjusted close prices with percentage changes
- **📊 Individual Stock Charts** - Line charts for MOS, TECK, and PG showing September 2025 performance
- **🔄 Comparative Performance Chart** - Normalized comparison of all stocks starting at base value of 100
- **💹 Monthly Returns Summary** - Quick overview of returns with market comparison
- **🎨 Modern UI** - Beautiful gradient designs with responsive layout
- **📱 Fully Responsive** - Works on desktop, tablet, and mobile devices

## 🛠️ Technologies Used

- **React 18.2** - UI framework
- **Vite 5.0** - Build tool and dev server
- **Tailwind CSS v4** - Utility-first CSS framework
- **Recharts 2.10** - Charting library
- **Lucide React** - Icon library

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (version 16 or higher)
- **npm** or **yarn**

## 🚀 Installation

1. **Clone or download the project:**
   ```bash
   mkdir stock-dashboard
   cd stock-dashboard
   ```

2. **Create the project structure** with all necessary files (see project structure below)

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to `http://localhost:5173` (or the URL shown in your terminal)

## 📦 Available Scripts

- `npm run dev` - Starts the development server with hot reload
- `npm run build` - Creates an optimized production build
- `npm run preview` - Previews the production build locally

## 📁 Project Structure

```
stock-dashboard/
├── package.json           # Project dependencies and scripts
├── vite.config.js         # Vite configuration with Tailwind plugin
├── index.html             # HTML entry point
├── src/
│   ├── index.jsx          # React entry point
│   ├── App.jsx            # Main application component
│   └── index.css          # Tailwind CSS imports and global styles
└── README.md              # Project documentation
```

## 📊 Data Source

The stock price data displayed in this dashboard is from **Yahoo Finance** and covers:
- **Base Date:** August 29, 2025
- **Period:** September 2025 (weekly data points)
- **Stocks:**
  - The Mosaic Co. (MOS)
  - Teck Resources (TECK)
  - Procter & Gamble (PG)
  - S&P 500 (SPY) - Market Benchmark

## 🎯 Key Insights (September 2025)

- 🏆 **TECK** - Best performer with +21.45% return
- 📈 **MOS** - Outperformed market with +6.48% return
- 📉 **PG** - Underperformed with -2.89% return
- 📊 **SPY** - Market benchmark at +2.88% return

## 🖥️ Components Overview

### 1. Price History Table
Displays daily adjusted close prices with:
- Date labels
- Price values in USD
- Percentage changes between dates
- Color-coded indicators (green for gains, red for losses)

### 2. Monthly Returns Summary
Shows total returns for the month with:
- Performance badges
- Market comparison indicators
- Visual icons for quick assessment

### 3. Individual Stock Charts
Three separate line charts showing:
- Price evolution for MOS, TECK, and PG
- Automatic price labels on data points
- Interactive tooltips
- Legend with stock names

### 4. Comparative Performance Chart
Normalized comparison showing:
- All stocks starting at 100 (August 29, 2025)
- Relative performance throughout September
- SPY benchmark (red dashed line)
- Key insights summary

## 🎨 Customization

To modify the stock data, edit the `data` array in `src/App.jsx`:

```javascript
const data = [
  { fecha: '2025-08-29', mosaic: 33.17, teck: 34.12, pg: 157.04, spy: 643.27, label: '29-Aug' },
  // Add or modify data points here
];
```

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 License

This project is open source and available for educational purposes.

## 🤝 Contributing

Feel free to fork this project and customize it for your own use!

## 📧 Contact

For questions or suggestions, feel free to reach out.

---

**Built with ❤️ using React + Vite + Tailwind CSS v4**