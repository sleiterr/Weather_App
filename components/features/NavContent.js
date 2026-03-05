import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { darkColors as colors } from "../../constants/colors";
import useWeatherApi from "../../hooks/useWeatherApi";

function formatLocalDateLabel(localtime) {
  // Expected format: "2024-06-15 14:30"
  if (!localtime) return "--";

  // Extract the date part and split it into components
  const [datePart] = localtime.split(" ");
  // Split the date into year, month, and day
  const [year, month, day] = datePart.split("-").map(Number);
  // Validate the extracted components
  if (!year || !month || !day) return "--";

  // Define arrays for weekday and month labels
  const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  // Define month labels
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  // Create a Date object using UTC to avoid timezone issues
  // month - 1 because JavaScript Date months are zero-indexed
  const date = new Date(Date.UTC(year, month - 1, day));
  // Get the weekday and month labels
  const weekday = weekdays[date.getUTCDay()];
  // Get the month label
  const monthLabel = months[month - 1];
  // Format the day with leading zero if necessary
  const dayLabel = String(day).padStart(2, "0");

  // Return the formatted date string
  if (!weekday || !monthLabel) return "--";

  // return the formatted date string in the format "WEEKDAY DD MONTH"
  return `${weekday} ${dayLabel} ${monthLabel}`;
}

const NavContent = () => {
  const { currentWeather, error, isFetching } = useWeatherApi();

  if (isFetching) return <Text style={styles.statusText}>Loading...</Text>;
  if (error) return <Text style={styles.statusText}>{error}</Text>;

  // Extract necessary data from the currentWeather object
  const city = currentWeather?.location?.name;
  const localtime = currentWeather?.location?.localtime;
  const formattedDate = formatLocalDateLabel(localtime);
  const lat = currentWeather?.location?.lat;
  const lon = currentWeather?.location?.lon;

  // Format the coordinates as "LAT° N/S, LON° E/W" or return "--" if data is missing
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
            <Text style={styles.subtitleStyle}>{formattedDate}</Text>
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
    marginTop: 42,
    marginBottom: 10,
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
