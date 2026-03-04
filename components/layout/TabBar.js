import { View, Pressable, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { darkColors as colors } from "../../constants/colors";
import HomeIcon from "../../assets/icons/home.svg";

export default function CustomTabBar({ state, navigation }) {
  // Define active and inactive colors for the tab icons and text
  const activeColor = colors.accent;
  // Inactive color is defined but not used directly in styles, it's applied inline in the component
  const inactiveColor = colors.textSecondary;
  // Determine which tab is active based on the state index
  const isHomeActive = state.index === 0;
  // The second tab is considered active if the index is 1, which corresponds to the "favorites" screen
  const isFavoritesActive = state.index === 1;

  return (
    <BlurView intensity={35} tint="dark" style={styles.container}>
      <Pressable
        style={({ pressed }) => [
          styles.tabButton,
          isHomeActive ? styles.tabButtonActive : styles.tabButtonInactive,
          pressed && styles.tabButtonPressed,
        ]}
        onPress={() => navigation.navigate("index")}
      >
        <View
          style={[
            styles.iconBadge,
            isHomeActive && styles.iconBadgeActive,
            !isHomeActive && styles.iconBadgeInactive,
          ]}
        >
          <HomeIcon
            width={16}
            height={16}
            color={isHomeActive ? colors.textTertiary : colors.textSecondary}
          />
        </View>
        <Text
          style={[
            styles.tabText,
            { color: isHomeActive ? activeColor : inactiveColor },
          ]}
        >
          Home
        </Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [
          styles.tabButton,
          isFavoritesActive ? styles.tabButtonActive : styles.tabButtonInactive,
          pressed && styles.tabButtonPressed,
        ]}
        onPress={() => navigation.navigate("favorites")}
      >
        <View style={styles.iconSlot}>
          <Ionicons
            name={isFavoritesActive ? "calendar" : "calendar-outline"}
            size={20}
            color={isFavoritesActive ? activeColor : inactiveColor}
          />
        </View>
        <Text
          style={[
            styles.tabText,
            { color: isFavoritesActive ? activeColor : inactiveColor },
          ]}
        >
          7-Day
        </Text>
      </Pressable>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center",
    gap: 4,

    position: "absolute",
    bottom: 16,

    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 999,
    overflow: "hidden",

    borderColor: colors.border,
    borderWidth: 1,
    backgroundColor: "rgba(26, 28, 30, 0.72)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 25 },
    shadowOpacity: 0.25,
    shadowRadius: 25,
    elevation: 12,
  },

  // Base styles for the tab button
  tabButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 22,

    width: 146,
    height: 46,
    borderRadius: 999,
    borderWidth: 1,
  },

  // Active and Inactive styles are applied conditionally in the component
  tabButtonActive: {
    backgroundColor: colors.btnBackground,
    borderColor: colors.borderBtn,
  },

  // Inactive styles are applied conditionally in the component
  tabButtonInactive: {
    backgroundColor: "transparent",
    borderColor: "transparent",
  },

  tabButtonPressed: {
    opacity: 0.85,
  },

  iconBadge: {
    width: 24,
    height: 24,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },

  iconSlot: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },

  iconBadgeActive: {
    backgroundColor: colors.accent,
  },

  iconBadgeInactive: {
    opacity: 0.45,
  },

  tabText: {
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
  },
});
