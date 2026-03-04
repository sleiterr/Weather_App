import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { darkColors as colors } from "../../constants/colors";
import useWeatherApi from "../../hooks/useWeatherApi";

export default function TemperatureHero() {
  const { currentWeather, error, isFetching } = useWeatherApi();

  if (isFetching) return <Text style={styles.statusText}>Loading...</Text>;
  if (error) return <Text style={styles.statusText}>{error}</Text>;

  const temp = currentWeather?.current?.temp_f;

  return (
    <View style={styles.container}>
      <Text style={styles.temperature}>
        {temp ?? "--"}
        {"\u00B0"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
