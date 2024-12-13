import { Stack } from "expo-router";
import { getColor } from "@app/ui";

// Create a QueryClient instance

export default function HomeLayout() {
	return (
		<Stack
			screenOptions={{
				headerStyle: {
					backgroundColor: getColor("brand", 500),
				},
				headerTintColor: getColor("common", "white"),
				headerTitleStyle: {
					fontWeight: "500",
				},
				headerShadowVisible: false,
			}}
		>
			<Stack.Screen
				name="index"
				options={{
					headerShown: true,
					title: "Home",
				}}
			/>
		</Stack>
	);
}
