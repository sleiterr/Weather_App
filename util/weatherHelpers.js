// Helper functions to interpret weather data
export const getUvLevel = (uv) => {
  if (uv <= 2) return "Low";
  if (uv <= 5) return "Moderate";
  if (uv <= 7) return "Hight";
  if (uv <= 10) return "Very Hight";

  return "Extreme";
};

// Convert US EPA index to descriptive air quality level
export const getAirQualityLevel = (index) => {
  switch (index) {
    case 1:
      return "Good";
    case 2:
      return "Moderate";
    case 3:
      return "Unhealthy for Sensitive Groups";
    case 4:
      return "Unhealthy";
    case 5:
      return "Very Unhealthy";
    case 6:
      return "Hazardous";
    default:
      return "Unknown";
  }
};

// Map weather condition codes to Ionicons icon names
export const weatherCodeToIcon = (code, isDay = 1) => {
  switch (code) {
    case 1000:
      return isDay ? "sunny-outline" : "moon-outline";
    case 1003:
      return isDay ? "partly-sunny-outline" : "cloud-outline";
    case 1006:
    case 1009:
      return "cloud-outline";
    case 1183:
    case 1063:
      return "rainy-outline";
    case 1117:
      return "snow-outline";
    default:
      return "help-circle-outline";
  }
};
