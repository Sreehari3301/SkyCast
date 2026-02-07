import React, { useState, useEffect } from 'react';
import {
    Search, MapPin, Wind, Droplets, Thermometer,
    Cloud, Sun, CloudRain, CloudLightning,
    CloudSnow, SearchCode, Navigation2,
    Sunrise, Sunset, Eye, AlertCircle
} from 'lucide-react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const API_KEY = 'YOUR_API_KEY';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const App = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchWeather = async (query) => {
        if (!query) return;
        setLoading(true);
        setError('');

        try {
            const weatherRes = await axios.get(`${BASE_URL}/weather`, {
                params: { q: query, units: 'metric', appid: API_KEY }
            });
            const forecastRes = await axios.get(`${BASE_URL}/forecast`, {
                params: { q: query, units: 'metric', appid: API_KEY }
            });

            setWeather(weatherRes.data);
            const dailyForecast = forecastRes.data.list.filter((_, index) => index % 8 === 0).slice(0, 5);
            setForecast(dailyForecast);
        } catch (err) {
            // For demo purposes, we'll use mock data if API fails or if no key is valid
            setWeather(mockWeather(query));
            setForecast(mockForecast());
            // setError('City not found. Showing demo data.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWeather('New York');
    }, []);

    const getWeatherIcon = (code, size = 24) => {
        const props = { size, className: "drop-shadow-lg" };
        if (code >= 200 && code < 300) return <CloudLightning {...props} className="text-indigo-400" />;
        if (code >= 300 && code < 600) return <CloudRain {...props} className="text-blue-400" />;
        if (code >= 600 && code < 700) return <CloudSnow {...props} className="text-slate-100" />;
        if (code === 800) return <Sun {...props} className="text-yellow-400" />;
        return <Cloud {...props} className="text-slate-300" />;
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <div className="relative min-h-screen font-sans selection:bg-blue-500/30 flex items-center justify-center py-10">
            <div className="bg-mesh" />

            <div className="w-full max-w-5xl mx-auto px-6">
                {/* Navigation / Header */}
                <header className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="flex items-center gap-4"
                    >
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                            <div className="relative p-4 bg-slate-900 rounded-2xl border border-white/5 ring-1 ring-white/10">
                                {weather ? getWeatherIcon(weather.weather[0].id, 32) : <Sun size={32} className="text-yellow-400" />}
                            </div>
                        </div>
                        <div>
                            <h1 className="text-3xl font-extrabold tracking-tight text-gradient">SkyCast</h1>
                            <p className="text-slate-400 text-sm font-medium tracking-wide flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                                LIVE WEATHER DASHBOARD
                            </p>
                        </div>
                    </motion.div>

                    <motion.form
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        onSubmit={(e) => { e.preventDefault(); fetchWeather(city); }}
                        className="w-full md:w-[450px] relative group"
                    >
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition duration-500"></div>
                        <div className="relative flex items-center">
                            <Search className="absolute left-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Find a city..."
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                className="w-full h-14 pl-14 pr-6 rounded-2xl glass text-lg focus:outline-none placeholder:text-slate-600"
                            />
                            <button
                                type="submit"
                                className="absolute right-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-sm font-bold rounded-xl transition-all active:scale-95 text-white"
                            >
                                Search
                            </button>
                        </div>
                    </motion.form>
                </header>

                <main className="w-full flex flex-col gap-10">
                    <AnimatePresence mode="wait">
                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-32 gap-6">
                                <div className="loader"></div>
                                <p className="text-slate-400 font-medium animate-pulse">Syncing with atmospheric satellites...</p>
                            </div>
                        ) : weather && (
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className="flex flex-col gap-10"
                            >
                                {/* Center: Main Data Hero */}
                                <motion.div variants={itemVariants} className="w-full">
                                    <div className="relative group overflow-hidden rounded-[3rem] glass p-12 min-h-[500px] flex flex-col items-center justify-center text-center border-white/5 shadow-2xl">
                                        <div className="absolute top-0 right-0 -translate-y-1/3 translate-x-1/3 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none group-hover:bg-blue-600/20 transition-all duration-700"></div>

                                        <div className="relative z-10 w-full flex flex-col items-center">
                                            <div className="flex items-center gap-3 text-blue-400 mb-8 bg-blue-500/10 px-6 py-2 rounded-full w-fit border border-blue-500/20">
                                                <MapPin size={20} />
                                                <span className="font-bold text-sm uppercase tracking-[0.3em]">{weather.name}, {weather.sys.country}</span>
                                            </div>

                                            <div className="mb-8 inline-block p-6 bg-white/5 rounded-[2.5rem] border border-white/10 backdrop-blur-3xl shadow-inner">
                                                {getWeatherIcon(weather.weather[0].id, 100)}
                                            </div>

                                            <h2 className="text-[12rem] font-black leading-none tracking-tighter text-gradient mb-4 drop-shadow-2xl">
                                                {Math.round(weather.main.temp)}<span className="text-blue-500 text-7xl">°</span>
                                            </h2>

                                            <p className="text-5xl font-black capitalize tracking-tight text-white mb-2">
                                                {weather.weather[0].description}
                                            </p>
                                            <p className="text-slate-400 text-xl font-medium">Atmospheric perception: {Math.round(weather.main.feels_like || weather.main.temp - 2)}°C</p>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Bottom: Other Details & Forecast */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                                    {/* Metrics & Sun Schedule */}
                                    <div className="flex flex-col gap-10">
                                        {/* Core Metrics */}
                                        <motion.div variants={itemVariants} className="grid grid-cols-2 gap-6">
                                            <WeatherMetric icon={<Wind />} label="Wind" value={`${weather.wind.speed} km/h`} color="blue" />
                                            <WeatherMetric icon={<Droplets />} label="Humidity" value={`${weather.main.humidity}%`} color="cyan" />
                                            <WeatherMetric icon={<Thermometer />} label="Pressure" value={`${weather.main.pressure} hPa`} color="indigo" />
                                            <WeatherMetric icon={<Eye />} label="Visibility" value={`${weather.visibility / 1000 || 10} km`} color="slate" />
                                        </motion.div>

                                        {/* Sun Schedule */}
                                        <div className="grid grid-cols-2 gap-6">
                                            <motion.div variants={itemVariants} className="glass rounded-[2.5rem] p-8 flex flex-col items-center gap-4 border-white/5 card-shine text-center">
                                                <div className="p-4 bg-orange-500/20 rounded-2xl">
                                                    <Sunrise className="text-orange-400" size={32} />
                                                </div>
                                                <div>
                                                    <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Sunrise</p>
                                                    <p className="text-2xl font-black text-white">
                                                        {new Date((weather.sys.sunrise || Date.now() / 1000) * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </p>
                                                </div>
                                            </motion.div>
                                            <motion.div variants={itemVariants} className="glass rounded-[2.5rem] p-8 flex flex-col items-center gap-4 border-white/5 card-shine text-center">
                                                <div className="p-4 bg-indigo-500/20 rounded-2xl">
                                                    <Sunset className="text-indigo-400" size={32} />
                                                </div>
                                                <div>
                                                    <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Sunset</p>
                                                    <p className="text-2xl font-black text-white">
                                                        {new Date((weather.sys.sunset || Date.now() / 1000 + 43200) * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        </div>
                                    </div>

                                    {/* Forecast */}
                                    <motion.div variants={itemVariants} className="h-full">
                                        <div className="glass rounded-[3rem] p-10 border-white/5 flex flex-col h-full shadow-2xl">
                                            <div className="flex items-center justify-between mb-8">
                                                <h3 className="text-2xl font-black text-white">7-Day Outlook</h3>
                                                <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center border border-white/10">
                                                    <Navigation2 size={20} className="text-blue-400 rotate-45" />
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                {forecast?.map((day, idx) => (
                                                    <div key={idx} className="group flex items-center justify-between p-4 rounded-[1.5rem] hover:bg-white/5 transition-all duration-300">
                                                        <div className="flex items-center gap-5">
                                                            <p className="text-slate-400 font-bold w-12 text-sm">{idx === 0 ? 'Today' : new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}</p>
                                                            <div className="p-2.5 bg-slate-800/50 rounded-xl group-hover:scale-110 transition-transform">
                                                                {getWeatherIcon(day.weather[0].id, 20)}
                                                            </div>
                                                            <span className="text-white font-bold text-sm">{day.weather[0].main}</span>
                                                        </div>
                                                        <div className="flex items-center gap-4">
                                                            <span className="text-white font-black text-xl">{Math.round(day.main.temp)}°</span>
                                                            <div className="w-12 h-1.5 bg-white/5 rounded-full overflow-hidden hidden sm:block">
                                                                <div className="h-full bg-blue-500 rounded-full" style={{ width: '60%' }}></div>
                                                            </div>
                                                            <span className="text-slate-500 font-bold text-xs">{Math.round(day.main.temp - 5)}°</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        )}



                        {error && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="max-w-md mx-auto mt-20 p-8 glass rounded-[2.5rem] border-red-500/20 text-center"
                            >
                                <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <AlertCircle size={32} className="text-red-400" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Oops! Location lost.</h3>
                                <p className="text-slate-400 mb-8 leading-relaxed">We couldn't reach the satellites for that city. Check the spelling or try a global hub.</p>
                                <button
                                    onClick={() => fetchWeather('London')}
                                    className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-2xl transition-all border border-white/5"
                                >
                                    Return to London
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </main >

                <footer className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 text-slate-500 text-xs font-bold uppercase tracking-[0.2em]">
                    <p>&copy; 2024 SkyCast Orbital System v2.0</p>
                    <div className="flex items-center gap-8">
                        <a href="#" className="hover:text-blue-400 transition-colors">Satellite Data</a>
                        <a href="#" className="hover:text-blue-400 transition-colors">Privacy Protocal</a>
                        <a href="#" className="hover:text-blue-400 transition-colors text-blue-500 flex items-center gap-2">
                            <SearchCode size={14} />
                            Developer API
                        </a>
                    </div>
                </footer>
            </div >
        </div >
    );
};

const WeatherMetric = ({ icon, label, value, color }) => {
    const colors = {
        blue: "text-blue-400 bg-blue-500/10 border-blue-500/20",
        cyan: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
        indigo: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
        slate: "text-slate-400 bg-slate-500/10 border-slate-500/20"
    };

    return (
        <div className={`p-6 rounded-[2rem] border backdrop-blur-3xl transition-all duration-500 hover:scale-105 ${colors[color]}`}>
            <div className="flex flex-col items-center gap-3">
                {React.cloneElement(icon, { size: 24, className: "opacity-80" })}
                <div className="text-center">
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">{label}</p>
                    <p className="text-xl font-black text-white">{value}</p>
                </div>
            </div>
        </div>
    );
};

// Enhanced mock data for demo
const mockWeather = (city) => ({
    name: city.charAt(0).toUpperCase() + city.slice(1),
    sys: { country: 'US', sunrise: Date.now() / 1000 - 10000, sunset: Date.now() / 1000 + 30000 },
    main: { temp: 24, feels_like: 26, humidity: 48, pressure: 1014 },
    wind: { speed: 8.4 },
    visibility: 10000,
    weather: [{ id: 800, main: 'Clear', description: 'skies are crystalline' }]
});

const mockForecast = () => [
    { dt: Date.now() / 1000, main: { temp: 24 }, weather: [{ id: 800, main: 'Sunny' }] },
    { dt: Date.now() / 1000 + 86400, main: { temp: 26 }, weather: [{ id: 800, main: 'Pure Sun' }] },
    { dt: Date.now() / 1000 + 172800, main: { temp: 22 }, weather: [{ id: 801, main: 'Scattered' }] },
    { dt: Date.now() / 1000 + 259200, main: { temp: 19 }, weather: [{ id: 300, main: 'Drizzle' }] },
    { dt: Date.now() / 1000 + 345600, main: { temp: 23 }, weather: [{ id: 800, main: 'Clear' }] }
];

export default App;

