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
    case 1030:
    case 1135:
    case 1147:
      return "cloud-outline";
    case 1183:
    case 1063:
    case 1150:
    case 1153:
    case 1180:
    case 1186:
    case 1189:
    case 1192:
    case 1195:
    case 1198:
    case 1201:
    case 1240:
    case 1243:
    case 1246:
      return "rainy-outline";
    case 1117:
    case 1066:
    case 1069:
    case 1072:
    case 1114:
    case 1171:
    case 1204:
    case 1207:
    case 1210:
    case 1213:
    case 1216:
    case 1219:
    case 1222:
    case 1225:
    case 1237:
    case 1249:
    case 1252:
    case 1255:
    case 1258:
    case 1261:
    case 1264:
      return "snow-outline";
    case 1087:
    case 1273:
    case 1276:
    case 1279:
    case 1282:
      return "thunderstorm-outline";
    default:
      return "help-circle-outline";
  }
};
