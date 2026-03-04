import { View, StyleSheet } from "react-native";
import { darkColors as colors } from "../../constants/colors";

export default function HourlyWeatherItem({ children, style }) {
  return (
    <>
      <View style={[styles.chip, style]}>{children}</View>
    </>
  );
}

const styles = StyleSheet.create({
  chip: {
    width: 55,
    height: 110,
    backgroundColor: colors.cardBackground,

    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
  },
});
