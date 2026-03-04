import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { darkColors as colors } from "../../constants/colors";

export default function FavoritesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorites</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: "700",
  },
});
