import { Tabs } from "expo-router";
import CustomTabBar from "../../components/layout/TabBar";
import { darkColors as colors } from "../../constants/colors";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      sceneContainerStyle={{ backgroundColor: colors.background }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="favorites" />
    </Tabs>
  );
}
