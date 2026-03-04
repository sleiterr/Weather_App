import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { darkColors as colors } from "../../constants/colors";

const heroText = [
  {
    id: 1,
    temperature: "70",

    titleStyle: {
      fontWeight: "700",
      fontSize: 128,
      color: colors.textPrimary,
      textTransform: "uppercase",
    },
  },
];

export default function TemperatureHero() {
  return <HeroItem />;
}

const HeroItem = () => {
  return (
    <>
      {heroText.map((item) => (
        <View key={item.id} style={{ marginBottom: 20 }}>
          <Text style={item.titleStyle}>
            {item.temperature}
            {"\u00B0"}
          </Text>
        </View>
      ))}
    </>
  );
};

const styles = StyleSheet.create({});
