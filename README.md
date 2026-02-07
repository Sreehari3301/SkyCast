# 🌤️ SkyCast | Premium Weather Dashboard

SkyCast is a modern, high-performance weather dashboard built with **React**, **Vite**, and **Framer Motion**. It features a stunning glassmorphism design, real-time weather data fetching, and a 5-day forecast.


## ✨ Features

-   **Real-time Data**: Fetches live weather information using the OpenWeatherMap API.
-   **Premium UI**: Sleek glassmorphism aesthetic with atmospheric gradients and smooth micro-animations.
-   **5-Day Forecast**: Weekly outlook with temperature and condition tracking.
-   **Dynamic Search**: Instant weather updates for any city worldwide.
-   **Responsive Design**: Fully optimized for Mobile, Tablet, and Desktop.
-   **Demo Mode**: Fully functional fallback UI for previewing without an API key.

## 🛠️ Tech Stack

-   **Frontend**: React.js (Hooks & Functional Components)
-   **Styling**: Vanilla CSS (Custom Design System) & Tailwind CSS (for the Demo)
-   **Animations**: Framer Motion
-   **Icons**: Lucide React / FontAwesome
-   **Build Tool**: Vite
-   **Data Fetching**: Axios

## 🚀 Getting Started

### Prerequisites

-   [Node.js](https://nodejs.org/) (v16.0 or higher)
-   An API Key from [OpenWeatherMap](https://openweathermap.org/api)

### Installation

1. **Clone or Download** the project to your local machine.
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Configuration**:
   Open `src/App.jsx` and replace the placeholder API key with your own:
   ```javascript
   const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY';
   ```
4. **Start Development Server**:
   ```bash
   npm run dev
   ```

## 🖥️ Instant Preview (No Node.js Required)

If you don't have Node.js installed yet, you can view the dashboard immediately by opening the `demo.html` file in your preferred web browser.

## 📁 Project Structure

```text
├── src/
│   ├── App.jsx        # Main application logic & API integration
│   ├── main.jsx       # React entry point
│   └── index.css      # Design system & Global styles
├── index.html         # HTML template & SEO meta tags
├── demo.html          # Self-contained preview file
├── package.json       # Project dependencies
└── vite.config.js     # Vite configuration
```

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).

---
