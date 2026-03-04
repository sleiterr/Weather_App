import { useState, useEffect } from "react";
import {
  WEATHER_API_KEY,
  WEATHER_ENDPOINTS,
  buildWeatherApiUrl,
} from "../constants/weatherApi";

export default function useWeatherApi() {
  const DEFAULT_CITY = "London";

  const [currentWeather, setCurrentWeather] = useState(null);
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const fetchWeather = async (city = DEFAULT_CITY) => {
    if (!WEATHER_API_KEY) {
      setError("Missing EXPO_PUBLIC_WEATHER_API_KEY in .env");
      return;
    }

    setIsFetching(true);
    setError(null);

    try {
      const url = buildWeatherApiUrl(WEATHER_ENDPOINTS.current, {
        q: city,
        aqi: "no",
      });

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error?.message || "Failed to fetch weather data");
      }

      setCurrentWeather(data);
    } catch (caughtError) {
      const message =
        caughtError?.message || "Unexpected error while fetching weather data";
      setError(message);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchWeather(DEFAULT_CITY);
  }, []);

  return { currentWeather, error, isFetching, fetchWeather };
}
