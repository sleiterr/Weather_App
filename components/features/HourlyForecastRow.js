import { View, Text, StyleSheet } from "react-native";
import HourlyWeatherItem from "../ui/HourlyWeatherItem";
import { darkColors as colors } from "../../constants/colors";
import useWeatherApi from "../../hooks/useWeatherApi";
import { weatherCodeToIcon } from "../../util/weatherHelpers";
import { Ionicons } from "@expo/vector-icons";

export default function HourlyForecastRow() {
  const { currentWeather, error, isFetching } = useWeatherApi();

  if (isFetching) return <Text style={styles.statusText}>Loading...</Text>;
  if (error) return <Text style={styles.statusText}>{error}</Text>;

  const hourlyForecast = currentWeather?.forecast?.forecastday?.[0]?.hour;
  if (!hourlyForecast?.length)
    return <Text style={styles.statusText}>No forecast data</Text>;

  const now = new Date();
  const currentHour = now.getHours();

  const formatHourLabel = (time) => {
    const hourPart = time?.split(" ")?.[1]?.split(":")?.[0];
    const hour = Number(hourPart);

    if (!Number.isFinite(hour)) return "--";

    const twelveHour = ((hour + 11) % 12) + 1;
    const suffix = hour >= 12 ? "PM" : "AM";

    return `${twelveHour}${suffix}`;
  };

  const hourlyData = hourlyForecast
    .slice(currentHour, currentHour + 6)
    .map((hourItem, index) => {
      const hourLabel =
        index === 0
          ? "NOW"
          : formatHourLabel(hourItem.time);
      return {
        id: index + 1,
        isNow: index === 0,
        value: hourLabel,
        temperature: Math.trunc(hourItem.temp_f),
        icon: weatherCodeToIcon(hourItem.condition.code, hourItem.is_day),
      };
    });

  return (
    <View>
      <Text>Hourly Forecast</Text>
      <View style={styles.rowChip}>
        {hourlyData.map((item) => (
          <HourlyWeatherItem
            key={item.id}
            style={[styles.chipCard, item.isNow && styles.nowChipCard]}
          >
            <Text style={[styles.value, item.isNow && styles.nowChipText]}>
              {item.value}
            </Text>
            <Ionicons
              name={item.icon}
              size={24}
              color={item.isNow ? colors.textTertiary : colors.textPrimary}
            />
            <Text
              style={[styles.temperature, item.isNow && styles.nowChipText]}
            >
              {item.temperature}
              {"\u00B0"}
            </Text>
          </HourlyWeatherItem>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rowChip: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },

  chipCard: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 17,
    paddingHorizontal: 8,
  },

  nowChipCard: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },

  nowChipText: {
    color: colors.textTertiary,
  },

  value: {
    fontWeight: "700",
    fontSize: 12,
    color: colors.textPrimary,
    textTransform: "uppercase",
  },

  temperature: {
    fontWeight: "700",
    fontSize: 18,
    color: colors.textPrimary,
  },
});
