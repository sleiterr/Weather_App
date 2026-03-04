import { View, StyleSheet } from "react-native";
import { darkColors as colors } from "../../constants/colors";

export default function ConditionsCard({ children, style }) {
  return (
    <>
      <View style={[styles.card, style]}>{children}</View>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 185,
    height: 128,
    backgroundColor: colors.cardBackground,

    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
});
