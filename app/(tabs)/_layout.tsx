import { Tabs } from "expo-router";
import CustomTabBar from "../components/CustomTabBar";

const TabsLayout = () => {
	return (
		<Tabs
			screenOptions={{
				headerStyle: {
					backgroundColor: "#6b13c0",
				},
				headerTintColor: "#fff",
				headerTitleStyle: {
					fontWeight: "600",
				},
				headerShown: false,
			}}
			tabBar={(props) => <CustomTabBar {...props} />}
		>
			<Tabs.Screen
				name="(home)"
				options={{
					title: "Home",
					headerTitle: "Home",
				}}
			/>
			<Tabs.Screen
				name="(users)"
				options={{
					title: "Users",
					headerTitle: "Users",
				}}
			/>
			<Tabs.Screen
				name="(settings)"
				options={{
					title: "Settings",
					headerTitle: "Settings",
				}}
			/>
		</Tabs>
	);
};

export default TabsLayout;
