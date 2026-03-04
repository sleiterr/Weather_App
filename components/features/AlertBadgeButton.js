import React, { useMemo, useState } from "react";
import { Text, StyleSheet, Pressable } from "react-native";
import { darkColors as colors } from "../../constants/colors";

const alertBadgeData = [
  {
    id: 1,
    apiText: "Mist",
  },
  {
    id: 2,
    apiText: "Moderate or heavy snow showers",
  },
  {
    id: 3,
    apiText: "Partly Cloudy",
  },
];

export default function AlertBadgeButton() {
  // state for fetching data from API
  const [index, setindex] = useState(0);
  // state for loading state  const [isFetching, setIsFetching] = useState(false);
  const current = useMemo(() => alertBadgeData[index], [index]);

  // function to handle button press
  const handlePress = () => {
    // setIsFetching(true);
    setindex((prev) => (prev + 1) % alertBadgeData.length);
    // pressable will cycle through the alertBadgeData array and update the current item
    onPressRoute(current);
  };

  return (
    <>
      <Pressable style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>{current.apiText}</Text>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",

    width: 366,
    height: 72,

    backgroundColor: colors.accent,
    borderRadius: 20,
    marginBottom: 35,
  },

  buttonText: {
    fontSize: 20,
    fontWeight: "900",
    color: colors.textTertiary,
    textAlign: "center",
    textTransform: "uppercase",
  },
});
