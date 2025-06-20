'use client';

import { useEffect, useState } from 'react';
import {
  FaSnowflake,
  FaSun,
  FaTemperatureHigh,
  FaCloudShowersHeavy,
  FaSmog,
  FaCloudSun
} from 'react-icons/fa';
import {
  WiHumidity,
  WiStrongWind,
  WiSunrise,
  WiSunset
} from 'react-icons/wi';
import { IoLocationSharp } from 'react-icons/io5';

export default function ClimateCard() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=26.2298&longitude=78.1734&daily=temperature_2m_max,weather_code,temperature_2m_min,wind_speed_10m_max,sunrise,sunset,uv_index_max,rain_sum,showers_sum,precipitation_sum&hourly=temperature_2m,relative_humidity_2m,rain,visibility,cloud_cover,uv_index,is_day&timezone=auto'
        );
        const data = await res.json();
        console.log('Open-Meteo data:', data);
        setWeather(data);
      } catch (err) {
        console.error('Failed to fetch Open-Meteo data:', err);
        setError('Failed to fetch weather data.');
      }
    };

    fetchWeather();
  }, []);

  if (error) {
    return <div className="text-red-500 p-6">Error: {error}</div>;
  }

  if (!weather) {
    return (
      <div className="bg-white rounded-xl p-6 shadow text-center w-[90%] max-w-xs">
        <p className="text-gray-600">Fetching weather data...</p>
      </div>
    );
  }

  const today = new Date();
  const index = 0; // Today is the first entry

  const temperature = weather.daily.temperature_2m_max[index];
  const minTemp = weather.daily.temperature_2m_min[index];
  const humidity = weather.hourly.relative_humidity_2m[0];
  const windSpeed = weather.daily.wind_speed_10m_max[index];
  const condition = 'Partly Cloudy';
  const sunrise = weather.daily.sunrise[index];
  const sunset = weather.daily.sunset[index];

  let Icon, bgColor, iconColor;
  if (temperature <= 10) {
    Icon = FaSnowflake;
    bgColor = 'bg-sky-200';
    iconColor = 'text-blue-600';
  } else if (temperature <= 25) {
    Icon = FaSun;
    bgColor = 'bg-yellow-200';
    iconColor = 'text-yellow-600';
  } else {
    Icon = FaTemperatureHigh;
    bgColor = 'bg-red-200';
    iconColor = 'text-red-600';
  }

  const getForecastIcon = (temp, rain) => {
    if (rain > 20) return FaCloudShowersHeavy;
    if (temp > 38) return FaTemperatureHigh;
    if (temp < 10) return FaSnowflake;
    if (temp >= 10 && temp <= 25) return FaSun;
    return FaCloudSun;
  };

  const getForecastLabel = (temp, rain) => {
    if (rain > 50) return 'Floody Situation';
    if (rain > 20) return 'Excessive Rain';
    if (temp > 38) return 'Excessive Heat';
    if (temp < 10) return 'Cold Weather';
    return 'Moderate Temp';
  };

  return (
    <div className="w-[90%] max-w-xs bg-white rounded-2xl shadow-lg p-6 font-[Montserrat] space-y-4">
      <p className="text-sm font-semibold text-gray-700">
        {today.toLocaleDateString('en-GB', {
          weekday: 'long',
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        })}
      </p>
      <div className="flex items-center gap-2 text-gray-500 text-sm">
        <IoLocationSharp className="text-lg" />
        <span>Gwalior, India</span>
      </div>

      <div className="flex justify-between text-sm text-gray-600">
        <p className="font-medium">Condition</p>
        <p>{condition}: {temperature}°C</p>
      </div>

      <div className="flex items-center gap-4">
        <div className={`${bgColor} p-4 rounded-full ${iconColor} text-3xl`}>
          <Icon />
        </div>
        <div>
          <div className="text-3xl font-bold text-black">
            {temperature}<span className="align-top text-xl">°C</span>
          </div>
          <p className="text-gray-700 font-medium">Min: {minTemp}°C</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <WiHumidity className="text-xl text-blue-400" />
          <span>{humidity}% Humidity</span>
        </div>
        <div className="flex items-center gap-2">
          <WiStrongWind className="text-xl text-cyan-400" />
          <span>{windSpeed} km/h Wind</span>
        </div>
        <div className="flex items-center gap-2">
          <WiSunrise className="text-xl text-orange-500" />
          <span>{sunrise}</span>
        </div>
        <div className="flex items-center gap-2">
          <WiSunset className="text-xl text-pink-500" />
          <span>{sunset}</span>
        </div>
      </div>

      <div className="mt-4 overflow-x-auto">
        <div className="flex gap-2 w-max">
          {weather.daily.time.slice(0, 7).map((date, idx) => {
            const dayTemp = weather.daily.temperature_2m_max[idx];
            const dayRain = weather.daily.rain_sum[idx];
            const Icon = getForecastIcon(dayTemp, dayRain);
            const label = getForecastLabel(dayTemp, dayRain);
            return (
              <div
                key={date}
                className="min-w-[100px] p-2 rounded-lg bg-gray-100 text-center flex flex-col items-center justify-center shadow-sm text-xs"
              >
                <p className="font-medium">
                  {new Date(date).toLocaleDateString('en-US', {
                    weekday: 'short',
                  })}
                </p>
                <Icon className="text-lg my-1" />
                <p className="font-semibold text-sm">{dayTemp}°C</p>
                <p className="text-[10px] text-gray-500 leading-tight">{label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}