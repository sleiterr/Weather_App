import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { darkColors as colors } from "../../constants/colors";
import useWeatherApi from "../../hooks/useWeatherApi";

const NavContent = () => {
  const { currentWeather, error, isFetching } = useWeatherApi();

  if (isFetching) return <Text style={styles.statusText}>Loading...</Text>;
  if (error) return <Text style={styles.statusText}>{error}</Text>;

  const city = currentWeather?.location?.name;
  const localtime = currentWeather?.location?.localtime;
  const lat = currentWeather?.location?.lat;
  const lon = currentWeather?.location?.lon;

  const coordinates =
    lat !== undefined && lon !== undefined
      ? `${Math.abs(lat).toFixed(4)}° ${lat >= 0 ? "N" : "S"}, ${Math.abs(lon).toFixed(4)}° ${lon >= 0 ? "E" : "W"}`
      : "--";

  return (
    <View style={styles.container}>
      <View style={styles.block}>
        <View style={styles.navContent}>
          <Text style={styles.titleStyle}>{city ?? "--"}</Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Text style={styles.subtitleStyle}>{localtime ?? "--"}</Text>
            <View style={styles.dot} />
            <Text style={styles.subtitleStyle}>{coordinates}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default NavContent;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    marginTop: 34,
    marginBottom: 30,
  },

  statusText: {
    color: colors.textPrimary,
    fontSize: 16,
  },

  navContent: {
    flex: 0,
    alignItems: "center",
    minWidth: 0,
  },

  titleStyle: {
    fontWeight: "700",
    fontSize: 30,
    color: colors.textPrimary,
    textTransform: "uppercase",
    maxWidth: "100%",
  },

  subtitleStyle: {
    fontWeight: "500",
    fontSize: 10,
    letterSpacing: 2,
    color: colors.textSecondary,
    textTransform: "uppercase",
  },

  block: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.textSecondary,
  },
});
