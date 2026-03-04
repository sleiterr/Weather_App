import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { darkColors as colors } from "../../constants/colors";
import ConditionsCard from "../ui/ConditionsCard";

const cardsData = [
  {
    id: 1,
    metric: "Wind",
    value: 24,
    unit: "MPH",
    displayValue: "NW",
  },
  {
    id: 2,
    metric: "Humidity",
    value: "82",
    unit: "%",
  },
  {
    id: 3,
    metric: "UV Index",
    value: 8,
    unit: "Very High",
  },
  {
    id: 4,
    metric: "Air Quality",
    value: 42,
    unit: "Good",
  },
];

export default function WeatherCardsGrid() {
  return (
    <>
      <View style={styles.cardWraper}>
        <DataItem />
      </View>
    </>
  );
}

const DataItem = () => {
  return (
    <>
      {cardsData.map((item) => (
        <ConditionsCard key={item.id} style={styles.cardPadding}>
          <View>
            <Text style={styles.metric}>{item.metric}</Text>
          </View>
          <View style={styles.valueWraper}>
            <Text style={styles.value}>{item.value}</Text>
            <Text style={styles.unit}>{item.unit}</Text>
          </View>
        </ConditionsCard>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
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
    width: "100%",
  },

  cardPadding: {
    flexDirection: "column",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
});
