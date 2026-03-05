import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { darkColors as colors } from "../../constants/colors";
import useWeatherApi from "../../hooks/useWeatherApi";

export default function AlertBadge() {
  const { currentWeather, error, isFetching } = useWeatherApi();

  if (isFetching) return <Text style={styles.statusText}>Loading...</Text>;
  if (error) return <Text style={styles.statusText}>{error}</Text>;

  const conditionText = currentWeather?.current?.condition?.text;

  return (
    <>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{conditionText ?? "--"}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  statusText: {
    color: colors.textPrimary,
    fontSize: 16,
    marginBottom: 12,
  },

  button: {
    alignItems: "center",
    justifyContent: "center",

    width: 366,
    height: 72,

    backgroundColor: colors.accent,
    borderRadius: 20,
    marginBottom: 35,
  },

  buttonText: {
    fontSize: 20,
    fontWeight: "900",
    color: colors.textTertiary,
    textAlign: "center",
    textTransform: "uppercase",
  },
});
