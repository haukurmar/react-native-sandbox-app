import { Tabs } from "expo-router";
import CustomTabBar from "../components/CustomTabBar";

const TabsLayout = () => {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="(users)"
        options={{
          title: "Profile",
        }}
      />
      <Tabs.Screen
        name="(settings)"
        options={{
          title: "Settings",
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
