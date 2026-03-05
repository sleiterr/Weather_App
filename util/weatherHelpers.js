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
