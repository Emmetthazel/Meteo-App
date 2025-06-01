import React, { useState } from 'react';
import { CloudRain } from 'lucide-react';
import { WeatherCard } from './components/WeatherCard';
import { SearchBar } from './components/SearchBar';
import type { WeatherData } from './types/weather';

const API_KEY = 'fee2eeec371b0aab756aa7c89abd3269';

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async (city: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=fr`;
      console.log('Fetching weather data from:', url);
      
      const response = await fetch(url);
      const data = await response.json();
      
      console.log('API Response:', data);
      
      if (!response.ok) {
        if (data.message) {
          throw new Error(`Erreur: ${data.message}`);
        } else if (response.status === 404) {
          throw new Error('Ville non trouvée. Vérifiez l\'orthographe et réessayez.');
        } else {
          throw new Error('Une erreur est survenue lors de la recherche. Veuillez réessayer.');
        }
      }
      
      setWeather(data);
    } catch (err) {
      console.error('Error fetching weather:', err);
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-600 py-8 px-4"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=2000&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <CloudRain className="h-10 w-10 text-white" />
            <h1 className="text-3xl font-bold text-white">Météo App</h1>
          </div>
          <SearchBar onSearch={fetchWeather} />
          <p className="text-white text-sm mt-2">
            Entrez le nom d'une ville (ex: Paris, London, New York)
          </p>
        </div>

        <div className="flex justify-center">
          {loading && (
            <div className="text-white text-lg">Chargement...</div>
          )}
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              {error}
            </div>
          )}
          
          {weather && !loading && !error && (
            <WeatherCard data={weather} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;