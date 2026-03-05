# Weather App (Expo + React Native)

A mobile weather app built with Expo Router and React Native.
It shows current conditions, hourly forecast, and a 7-day forecast with expandable details.

## Features

- Current weather hero section with condition icon and temperature
- Weather metrics cards: wind, humidity, UV index, air quality
- Hourly forecast row (next 6 hours)
- 7-day forecast screen with accordion widgets
  - High/low temperature
  - Precipitation chance
  - Wind speed
  - UV index
  - Sunrise/Sunset
- Custom bottom tab bar with blur background
- Weather condition → icon mapping via helper function

## Tech Stack

- Expo `~54.0.33`
- React Native `0.81.5`
- React `19.1.0`
- Expo Router `~6.0.23`
- WeatherAPI (forecast + current data)
- Ionicons (`@expo/vector-icons`)

## Project Structure

```txt
app/
  (tabs)/
    index.js          # Home screen
    favorites.js      # 7-day forecast screen
components/
  features/
  layout/
  ui/
hooks/
  useWeatherApi.js
constants/
  weatherApi.js
util/
  weatherHelpers.js
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- Expo CLI (optional, `npx expo` also works)

### Installation

1. Install dependencies

```bash
npm install
```

2. Create a `.env` file in project root:

```env
EXPO_PUBLIC_WEATHER_API_BASE_URL=https://api.weatherapi.com/v1
EXPO_PUBLIC_WEATHER_API_KEY=your_weatherapi_key
```

3. Run the app

```bash
npm run start
```

Then open on:

- iOS simulator (`i` in terminal)
- Android emulator (`a` in terminal)
- Expo Go app (scan QR)

## Available Scripts

- `npm run start` — start Expo dev server
- `npm run ios` — run iOS target
- `npm run android` — run Android target
- `npm run web` — run web target

## Configuration Notes

- Default city is set in `hooks/useWeatherApi.js`:
  - `const DEFAULT_CITY = "Viborg";`
- Forecast request currently uses:
  - `days: 7`
  - `aqi: "yes"`

## Screens

- **Home** (`app/(tabs)/index.js`)
  - Navigation header content
  - Temperature hero
  - Alert badge
  - Weather cards grid
  - Hourly forecast row

- **7-Day** (`app/(tabs)/favorites.js`)
  - Forecast cards by day
  - Expand/collapse animation (`LayoutAnimation`)
  - Detail rows with icons and values

## Roadmap

- [ ] Add city search input (dynamic location)
- [ ] Add unit toggle (°C / °F)
- [ ] Add loading skeletons
- [ ] Add tests for helper mapping logic

## Troubleshooting

- If you see `Missing EXPO_PUBLIC_WEATHER_API_KEY in .env`, check `.env` key name.
- If icons appear as `?`, add missing weather condition codes in `util/weatherHelpers.js`.
- After `.env` changes, restart Expo server.

## License

This project is for educational purposes.
Add your preferred license if publishing publicly.
