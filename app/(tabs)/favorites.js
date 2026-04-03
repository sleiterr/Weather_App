import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { darkColors as colors } from "../../constants/colors";
import useWeatherApi from "../../hooks/useWeatherApi";
import { weatherCodeToIcon } from "../../util/weatherHelpers";

// Enable LayoutAnimation on Android
if (
  Platform.OS === "android" &&
  // UIManager may not be available in some environments, so we check for its existence before calling the method
  UIManager.setLayoutAnimationEnabledExperimental
) {
  // UIManager.setLayoutAnimationEnabledExperimental is a method that enables the use of LayoutAnimation on Android devices.
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Helper function to format date strings into a short format (e.g., "Jan 1")
function formatShortDate(dateString) {
  if (!dateString) return "--";

  // The Date constructor is used to parse the date string. If the string is invalid, getTime() will return NaN, which we check for to avoid formatting errors.
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "--";

  return date
    .toLocaleDateString("en-US", { month: "short", day: "numeric" })
    .toUpperCase();
}

// Helper function to format date strings into a weekday name (e.g., "Monday")
function formatWeekday(dateString) {
  if (!dateString) return "--";

  // The Date constructor is used to parse the date string. If the string is invalid, getTime() will return NaN, which we check for to avoid formatting errors.
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "--";

  return date.toLocaleDateString("en-US", { weekday: "long" }).toUpperCase();
}

// The main component for the Forecast screen, which displays a forecast with expandable details for each day.
export default function ForecastScreen() {
  const { currentWeather, error, isFetching } = useWeatherApi();
  const [expandedId, setExpandedId] = useState(1);

  if (isFetching) return <Text style={styles.statusText}>Loading...</Text>;
  if (error) return <Text style={styles.statusText}>{error}</Text>;

  // currentWeather?.forecast?.forecastday is expected to be an array of forecast data for each day.
  const forecastDays = currentWeather?.forecast?.forecastday ?? [];

  // Prepare the data for the forecast widgets by mapping over available forecast days from API.
  const forecastWidgets = forecastDays.map((dayData, index) => {
    const dayInfo = dayData?.day;
    const astro = dayData?.astro;
    const avgTemp = dayInfo?.avgtemp_f;
    const maxTemp = dayInfo?.maxtemp_c;
    const minTemp = dayInfo?.mintemp_c;
    const maxWind = dayInfo?.maxwind_mph;
    const precipChance = dayInfo?.daily_chance_of_rain;
    const uv = dayInfo?.uv;

    // return an object representing the data for a single day's forecast, which will be used to render the forecast widget. Each object includes an id, formatted day and date, temperature information, precipitation chance, wind speed, UV index, sunrise and sunset times, and the corresponding weather icon.
    return {
      id: index + 1,
      day: formatWeekday(dayData?.date),
      date: formatShortDate(dayData?.date),
      temperature: Number.isFinite(avgTemp) ? `${Math.trunc(avgTemp)}F` : "--",
      highTemp: Number.isFinite(maxTemp) ? `${Math.round(maxTemp)}°` : "--",
      lowTemp: Number.isFinite(minTemp) ? `${Math.round(minTemp)}°` : "--",
      precip: precipChance !== undefined ? `${precipChance}%` : "--",
      wind: Number.isFinite(maxWind) ? `${Math.trunc(maxWind)} MPH` : "--",
      uv: Number.isFinite(uv) ? String(uv) : "--",
      sunrise: astro?.sunrise ?? "--",
      sunset: astro?.sunset ?? "--",
      icon: weatherCodeToIcon(dayInfo?.condition?.code, 1),
    };
  });

  // toggleAccordion is a function that handles the expansion and collapse of the forecast widgets. When a widget is pressed, it checks if the pressed widget's id matches the currently expanded id. If it does, it collapses the widget by setting expandedId to 0; otherwise, it expands the new widget by setting expandedId to the pressed widget's id. The LayoutAnimation.configureNext method is called to animate the transition smoothly when expanding or collapsing the widgets.
  const toggleAccordion = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedId((currentId) => (currentId === id ? 0 : id));
  };

  const forecastTitle = `${forecastWidgets.length || 0} - Day Forecast`;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>{forecastTitle}</Text>

      <View style={styles.widgetsList}>
        {forecastWidgets.map((widget) => (
          <Pressable
            key={widget.id}
            style={[
              styles.widgetCard,
              expandedId === widget.id && styles.widgetCardExpanded,
            ]}
            onPress={() => toggleAccordion(widget.id)}
          >
            <View
              style={[
                styles.widgetHeader,
                expandedId === widget.id && styles.widgetHeaderExpanded,
              ]}
            >
              <View style={styles.headerContent}>
                <Text style={styles.weekday}>{widget.day}</Text>
                <Text style={styles.weekdayDate}>{widget.date}</Text>
              </View>
              <View style={styles.headerRight}>
                <Ionicons
                  name={widget.icon}
                  size={40}
                  color={
                    expandedId === widget.id
                      ? colors.accent
                      : colors.textSecondary
                  }
                />
                <View style={styles.tempRow}>
                  <Text style={styles.highTemp}>{widget.highTemp}</Text>
                  <Text style={styles.lowTemp}>{widget.lowTemp}</Text>
                </View>
              </View>
            </View>

            {expandedId === widget.id && (
              <View style={styles.detailsWrap}>
                <View style={styles.metricsGroup}>
                  {[
                    {
                      label: "PRECIP",
                      value: widget.precip,
                      icon: "water-outline",
                    },
                    { label: "WIND", value: widget.wind, icon: "flag-outline" },
                    { label: "UV", value: widget.uv, icon: "sunny-outline" },
                  ].map(({ label, value, icon }) => (
                    <View key={label} style={styles.detailRow}>
                      <Text style={styles.detailLabel}>{label}</Text>
                      <View style={styles.detailValueWrap}>
                        <Ionicons name={icon} size={16} color={colors.accent} />
                        <Text style={styles.detailValue}>{value}</Text>
                      </View>
                    </View>
                  ))}
                </View>
                <View style={styles.sunTimesGroup}>
                  {[
                    {
                      label: "SUNRISE",
                      value: widget.sunrise,
                      icon: "sunny-outline",
                    },
                    {
                      label: "SUNSET",
                      value: widget.sunset,
                      icon: "moon-outline",
                    },
                  ].map(({ label, value, icon }) => (
                    <View key={label} style={styles.detailRow}>
                      <Text style={styles.detailLabel}>{label}</Text>
                      <View style={styles.detailValueWrap}>
                        <Ionicons name={icon} size={16} color={colors.accent} />
                        <Text style={styles.detailValue}>{value}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  statusText: {
    color: colors.textPrimary,
    textAlign: "center",
    marginTop: 24,
  },

  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    alignItems: "center",
  },

  title: {
    marginTop: 42,
    marginBottom: 35,
    fontWeight: "700",
    fontSize: 10,
    color: colors.textPrimary,
    textTransform: "uppercase",
    letterSpacing: 4,
    textAlign: "center",
    alignSelf: "center",
  },

  widgetsList: {
    marginTop: 0,
    gap: 12,
  },

  widgetCard: {
    width: 382,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.cardBackground,
    paddingHorizontal: 21,
    paddingVertical: 22,
    gap: 12,
  },

  widgetCardExpanded: {
    borderColor: colors.borderActive,
    shadowColor: colors.shadowAccentSoft,
    shadowOpacity: 1,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 0 },
    elevation: 4,
  },

  widgetHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 0,
  },

  widgetHeaderExpanded: {
    paddingBottom: 21,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  headerContent: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: 2,
  },

  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 25,
  },

  tempRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },

  highTemp: {
    fontWeight: "700",
    fontSize: 24,
    color: colors.textPrimary,
  },

  lowTemp: {
    fontWeight: "700",
    fontSize: 16,
    color: colors.textSecondary,
  },

  weekday: {
    fontWeight: "700",
    fontSize: 18,
    color: colors.textPrimary,
    letterSpacing: 0.04,
    textTransform: "uppercase",
  },

  weekdayDate: {
    fontWeight: "500",
    fontSize: 10,
    color: colors.textSecondary,
    textTransform: "uppercase",
    letterSpacing: 1,
  },

  detailsWrap: {
    paddingTop: 25,
    gap: 27,
  },

  metricsGroup: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: 42,
    width: "100%",
  },

  sunTimesGroup: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: 30,
    width: "100%",
  },

  detailRow: {
    minWidth: 80,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: 10,
  },

  detailLabel: {
    fontWeight: "700",
    fontSize: 9,
    color: colors.textSecondary,
    textTransform: "uppercase",
    letterSpacing: 1.3,
    textAlign: "left",
  },

  detailValue: {
    fontWeight: "700",
    fontSize: 16,
    color: colors.textPrimary,
    textAlign: "left",
  },

  detailValueWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
});
