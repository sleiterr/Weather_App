import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import NavContent from "../../components/features/NavContent";
import TemperatureHero from "../../components/ui/TemperatureHero";
import AlertBadge from "../../components/features/AlertBadge";
import WeatherCardsGrid from "../../components/features/WeatherCardsGrid";
import HourlyForecastRow from "../../components/features/HourlyForecastRow.js";
import { darkColors as colors } from "../../constants/colors";

export default function DogApiScreen() {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <NavContent />
      <TemperatureHero />
      <AlertBadge />
      <WeatherCardsGrid />
      <HourlyForecastRow />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },

  container: {
    alignItems: "center",
    paddingBottom: 24,
  },
});
