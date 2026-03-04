export const WEATHER_API_BASE_URL =
  process.env.EXPO_PUBLIC_WEATHER_API_BASE_URL ||
  "https://api.weatherapi.com/v1";

export const WEATHER_API_KEY = process.env.EXPO_PUBLIC_WEATHER_API_KEY || "";

export const WEATHER_ENDPOINTS = {
  current: "/current.json",
  forecast: "/forecast.json",
  search: "/search.json",
};

export function buildWeatherApiUrl(endpoint, params = {}) {
  const url = new URL(`${WEATHER_API_BASE_URL}${endpoint}`);

  if (WEATHER_API_KEY) {
    url.searchParams.set("key", WEATHER_API_KEY);
  }

  Object.entries(params).forEach(([name, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(name, String(value));
    }
  });

  return url.toString();
}
