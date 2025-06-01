import React from 'react';
import { Cloud, Droplets, Thermometer, Wind } from 'lucide-react';
import { WeatherData } from '../types/weather';

interface WeatherCardProps {
  data: WeatherData;
}

export function WeatherCard({ data }: WeatherCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {data.name}, {data.sys.country}
          </h2>
          <p className="text-gray-600 mt-1">
            {data.weather[0].description.charAt(0).toUpperCase() + 
             data.weather[0].description.slice(1)}
          </p>
        </div>
        <img
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          alt={data.weather[0].description}
          className="w-16 h-16"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <Thermometer className="text-blue-500" />
          <div>
            <p className="text-3xl font-bold text-gray-800">
              {Math.round(data.main.temp)}°C
            </p>
            <p className="text-sm text-gray-600">Ressenti {Math.round(data.main.feels_like)}°C</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Wind className="text-blue-500" />
          <div>
            <p className="text-lg font-semibold text-gray-800">
              {Math.round(data.wind.speed * 3.6)} km/h
            </p>
            <p className="text-sm text-gray-600">Vent</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Droplets className="text-blue-500" />
          <div>
            <p className="text-lg font-semibold text-gray-800">
              {data.main.humidity}%
            </p>
            <p className="text-sm text-gray-600">Humidité</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Cloud className="text-blue-500" />
          <div>
            <p className="text-lg font-semibold text-gray-800">
              {data.main.pressure} hPa
            </p>
            <p className="text-sm text-gray-600">Pression</p>
          </div>
        </div>
      </div>
    </div>
  );
}