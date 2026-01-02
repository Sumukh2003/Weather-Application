import React, { useEffect } from "react";
import clear_icon from "./assets/clear.png";
import cloudy_icon from "./assets/cloudy.png";
import drizzle_icon from "./assets/drizzle.png";
import humid_icon from "./assets/humid.png";
import rainy_icon from "./assets/rainy.png";
import snow_icon from "./assets/snow.png";
import windy_icon from "./assets/windy.png";
import mist_icon from "./assets/mist.png";
import { useState } from "react";
import { useRef } from "react";
import {
  FaSearch,
  FaWind,
  FaTint,
  FaMapMarkerAlt,
  FaThermometerHalf,
} from "react-icons/fa";

const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState({
    humidity: 0,
    windSpeed: 0,
    temperature: 0,
    location: "Search a city",
    icon: clear_icon,
    description: "",
  });

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloudy_icon,
    "02n": cloudy_icon,
    "03d": cloudy_icon,
    "03n": cloudy_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rainy_icon,
    "09n": rainy_icon,
    "10d": rainy_icon,
    "10n": rainy_icon,
    "11d": rainy_icon,
    "11n": rainy_icon,
    "13d": snow_icon,
    "13n": snow_icon,
    "50d": mist_icon,
    "50n": mist_icon,
  };

  const search = async (city) => {
    if (city === "") {
      alert("Please enter a city name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.cod === "404") {
        alert("City not found. Please try again.");
        return;
      }

      const icon = allIcons[data.weather[0].icon] || clear_icon;

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
        temperature: Math.round(data.main.temp),
        location: data.name,
        country: data.sys.country,
        icon: icon,
        description: data.weather[0].description,
        feelsLike: Math.round(data.main.feels_like),
        pressure: data.main.pressure,
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
      alert("Failed to fetch weather data. Please check your connection.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      search(inputRef.current.value);
    }
  };

  useEffect(() => {
    search("New York");
  }, []);

  return (
    <div className="weather">
      <div className="weather-header">
        <FaThermometerHalf className="header-icon" />
        <div>
          <h1>Weather Forecast</h1>
          <p className="subtitle">Real-time weather updates</p>
        </div>
      </div>

      <div className="weather-container">
        <div className="search-section">
          <div className="search-group">
            <input
              ref={inputRef}
              type="text"
              placeholder="Enter city name..."
              onKeyPress={handleKeyPress}
              className="city-input"
            />
            <button
              className="search-btn"
              onClick={() => search(inputRef.current.value)}
            >
              <FaSearch className="btn-icon" />
              <span>Search</span>
            </button>
          </div>

          <div className="location-info">
            <FaMapMarkerAlt className="location-icon" />
            <span>
              {weatherData.location}, {weatherData.country}
            </span>
          </div>
        </div>

        <div className="weather-display">
          <div className="current-weather">
            <img
              src={weatherData.icon}
              alt="weather"
              className="weather-icon"
            />

            <div className="temperature-section">
              <div className="temp-main">
                <span className="temperature">{weatherData.temperature}</span>
                <span className="temp-unit">°C</span>
              </div>

              <div className="weather-description">
                {weatherData.description}
              </div>

              <div className="feels-like">
                Feels like {weatherData.feelsLike}°C
              </div>
            </div>
          </div>

          <div className="weather-stats">
            <div className="stat-card">
              <div className="stat-header">
                <FaWind className="stat-icon" />
                <span>Wind</span>
              </div>
              <div className="stat-value">{weatherData.windSpeed} km/h</div>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <FaTint className="stat-icon" />
                <span>Humidity</span>
              </div>
              <div className="stat-value">{weatherData.humidity}%</div>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <FaThermometerHalf className="stat-icon" />
                <span>Pressure</span>
              </div>
              <div className="stat-value">{weatherData.pressure} hPa</div>
            </div>
          </div>
        </div>

        <div className="weather-footer">
          <div className="footer-text">
            <p>Data provided by OpenWeatherMap</p>
            <p className="update-time">Updated just now</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
