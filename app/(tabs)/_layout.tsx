import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { getColor } from "@app/ui";

export default function TabsLayout() {
	return (
		<Tabs
			screenOptions={{
				tabBarStyle: {
					backgroundColor: getColor("neutral", 800),
					borderTopColor: getColor("neutral", 900),
					height: 65,
					paddingBottom: 8,
					paddingTop: 8,
				},
				tabBarActiveTintColor: getColor("brand", 300),
				tabBarInactiveTintColor: getColor("neutral", 400),
			}}
		>
			<Tabs.Screen
				name="(home)"
				options={{
					headerShown: false,
					title: "Home",
					tabBarIcon: ({ focused, color, size }) => (
						<Ionicons
							name={focused ? "home" : "home-outline"}
							size={size}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="(users)"
				options={{
					headerShown: false,
					title: "Users",
					tabBarIcon: ({ focused, color, size }) => (
						<Ionicons
							name={focused ? "people" : "people-outline"}
							size={size}
							color={color}
						/>
					),
				}}
			/>
		</Tabs>
	);
}
