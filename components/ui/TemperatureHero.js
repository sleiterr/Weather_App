import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { darkColors as colors } from "../../constants/colors";
import useWeatherApi from "../../hooks/useWeatherApi";
import { weatherCodeToIcon } from "../../util/weatherHelpers";

export default function TemperatureHero() {
  const { currentWeather, error, isFetching } = useWeatherApi();

  if (isFetching) return <Text style={styles.statusText}>Loading...</Text>;
  if (error) return <Text style={styles.statusText}>{error}</Text>;

  const temp = currentWeather?.current?.temp_f;
  const displayTemp = Number.isFinite(temp) ? Math.trunc(temp) : "--";
  const iconName = weatherCodeToIcon(
    currentWeather?.current?.condition?.code,
    currentWeather?.current?.is_day
  );

  return (
    <View style={styles.container}>
      <Ionicons name={iconName} size={40} color={colors.textSecondary} />
      <Text style={styles.temperature}>
        {displayTemp}
        {"\u00B0"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 10,
    marginBottom: 20,
  },
  statusText: {
    color: colors.textPrimary,
    fontSize: 16,
    marginBottom: 20,
  },
  temperature: {
    fontWeight: "700",
    fontSize: 128,
    color: colors.textPrimary,
    textTransform: "uppercase",
  },
});
