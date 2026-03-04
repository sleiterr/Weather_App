import { View, Text, StyleSheet } from "react-native";
import HourlyWeatherItem from "../ui/HourlyWeatherItem";
import { darkColors as colors } from "../../constants/colors";

const hourlyData = [
  {
    id: 1,
    value: "now",
    temperature: 72,
  },

  {
    id: 2,
    value: "4PM",
    temperature: 70,
  },

  {
    id: 3,
    value: "5PM",
    temperature: 68,
  },

  {
    id: 4,
    value: "6PM",
    temperature: 66,
  },

  {
    id: 5,
    value: "7PM",
    temperature: 64,
  },
  {
    id: 6,
    value: "8PM",
    temperature: 64,
  },
];

export default function HourlyForecastRow() {
  return (
    <View>
      <Text>Hourly Forecast</Text>
      <HourlyItem />
    </View>
  );
}

const HourlyItem = () => {
  return (
    <>
      <View style={styles.rowChip}>
        {hourlyData.map((item) => (
          <HourlyWeatherItem key={item.id} style={styles.chipCard}>
            <Text style={styles.value}>{item.value}</Text>
            <Text style={styles.temperature}>
              {item.temperature}
              {"\u00B0"}
            </Text>
          </HourlyWeatherItem>
        ))}
      </View>
    </>
  );
};

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

  value: {
    fontWeight: "500",
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
