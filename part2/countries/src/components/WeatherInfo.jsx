import { useState, useEffect } from "react";
import axios from "axios";

const WeatherInfo = ({ capital }) => {
    const api_key = import.meta.env.VITE_SOME_KEY;
    const [weather, setweather] = useState({});

    useEffect(() => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${api_key}`)
        .then(res => setweather(res.data))
        .catch(err => {
            console.log(err);
        });
    }, []);

    if (!weather.name) return null;

    return (
        <>
            <h2>Weather in {capital}</h2>
            <p>temperature {weather.main.temp} Celcius</p>
            <img 
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
                alt={weather.weather[0].description} />
            <p>wind {weather.wind.speed} m/s</p>
        </>
    );
};

export default WeatherInfo;