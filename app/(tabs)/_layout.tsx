import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

// Create a QueryClient instance

export default function TabsLayout() {
	return (
		<Tabs
			screenOptions={{
				tabBarStyle: {
					backgroundColor: "#333",
					borderTopColor: "#555",
					height: 65,
					paddingBottom: 8,
					paddingTop: 8,
				},
				tabBarActiveTintColor: "#fff",
				tabBarInactiveTintColor: "#ddd",
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
