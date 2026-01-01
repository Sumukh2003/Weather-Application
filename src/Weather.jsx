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

const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);

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
      alert("Enter city name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);

      const icon = allIcons[data.weather[0].icon] || clear_icon;

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {}
  };
  useEffect(() => {
    search("New York");
  }, []);
  return (
    <div className="weather">
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder="Enter city name" />
        <button onClick={() => search(inputRef.current.value)}>Search</button>
      </div>
      <img src={weatherData.icon} alt="image" className="weather-icon" />
      <p className="temperature">{weatherData.temperature}°C</p>
      <p className="location">{weatherData.location}</p>
      <div className="weather-data">
        <div className="col">
          <img src={windy_icon} alt="image" className="weather-img" />
          <div>
            <p>{weatherData.windSpeed}</p>
            <p>Wind speed</p>
          </div>
        </div>
        <div className="col">
          <img src={humid_icon} alt="image" className="weather-img" />
          <div>
            <p>{weatherData.humidity}</p>
            <p>Humidity</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
