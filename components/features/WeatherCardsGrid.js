import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { darkColors as colors } from "../../constants/colors";
import ConditionsCard from "../ui/ConditionsCard";
import useWeatherApi from "../../hooks/useWeatherApi";
import { getUvLevel, getAirQualityLevel } from "../../util/weatherHelpers";

export default function WeatherCardsGrid() {
  const { currentWeather, error, isFetching } = useWeatherApi();

  // Extract UV and Air Quality values for display
  const uvValue = currentWeather?.current?.uv;
  // Get descriptive levels for UV and Air Quality
  const airQualityIndex =
    currentWeather?.current?.air_quality?.["us-epa-index"];

  if (isFetching) return <Text style={styles.statusText}>Loading...</Text>;
  if (error) return <Text style={styles.statusText}>{error}</Text>;

  // Handle case where weather data is not available
  if (!currentWeather?.current)
    return <Text style={styles.statusText}>No weather data</Text>;

  // Prepare data for each card
  const weatherCards = [
    {
      id: 1,
      title: "Wind",
      value: currentWeather.current.wind_mph,
      unit: currentWeather.current.wind_dir,
      icon: "navigate-outline",
    },
    {
      id: 2,
      title: "Humidity",
      value: currentWeather.current.humidity,
      unit: "%",
      icon: "water-outline",
    },
    {
      id: 3,
      title: "UV Index",
      value: uvValue,
      unit: getUvLevel(uvValue),
      icon: "sunny-outline",
    },
    {
      id: 4,
      title: "Air Quality",
      value: airQualityIndex,
      unit: getAirQualityLevel(airQualityIndex),
      icon: "leaf-outline",
    },
  ];

  return (
    <>
      <View style={styles.cardWraper}>
        {weatherCards.map((card) => (
          <ConditionsCard key={card.id} style={styles.cardPadding}>
            <View style={styles.headerRow}>
              <Text style={styles.metric}>{card.title}</Text>
              <Ionicons
                name={card.icon}
                size={14}
                color={colors.textSecondary}
              />
            </View>
            <View style={styles.valueWraper}>
              <Text style={styles.value}>{card.value}</Text>
              <Text style={styles.unit}>{card.unit}</Text>
            </View>
          </ConditionsCard>
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  statusText: {
    color: colors.textSecondary,
    textAlign: "center",
  },

  cardWraper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 12,
  },

  metric: {
    fontWeight: "700",
    fontSize: 10,
    color: colors.textSecondary,
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  value: {
    fontWeight: "700",
    fontSize: 48,
    color: colors.textPrimary,
  },

  unit: {
    fontWeight: "500",
    fontSize: 15,
    color: colors.textSecondary,
    textTransform: "uppercase",
  },

  valueWraper: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "flex-start",
    gap: 4,
    width: "100%",
  },

  cardPadding: {
    flexDirection: "column",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
});
