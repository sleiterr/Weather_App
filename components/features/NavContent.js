import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { darkColors as colors } from "../../constants/colors";

const textNav = [
  {
    id: 1,
    title: "Oklahoma City",
    dateLabel: "Mon 14 Oct",
    coordinates: "35.4676° N, 97.5164° W",

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
  },
];

const NavContent = () => {
  return (
    <View style={styles.container}>
      <Navtem />
    </View>
  );
};

const Navtem = () => {
  return (
    <>
      {textNav.map((item) => (
        <View key={item.id} style={styles.block}>
          <View style={styles.navContent}>
            <Text style={item.titleStyle}>{item.title}</Text>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
            >
              <Text style={item.subtitleStyle}>{item.dateLabel}</Text>
              <View style={styles.dot} />
              <Text style={item.subtitleStyle}>{item.coordinates}</Text>
            </View>
          </View>
        </View>
      ))}
    </>
  );
};

export default NavContent;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    paddingTop: 34,
    paddingBottom: 50,
  },

  navContent: {
    flex: 0,
    alignItems: "center",
    minWidth: 0,
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
