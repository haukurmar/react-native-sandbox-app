import { Tabs } from "expo-router";

// Create a QueryClient instance

export default function TabsLayout() {
	return (
		<Tabs>
			<Tabs.Screen
				name="(home)"
				options={{
					headerShown: false,
					title: "Home page",
				}}
			/>
			<Tabs.Screen
				name="(users)"
				options={{
					headerShown: false,
					title: "Users",
				}}
			/>
		</Tabs>
	);
}
