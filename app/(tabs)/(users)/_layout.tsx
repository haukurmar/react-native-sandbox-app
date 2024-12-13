import { Stack } from "expo-router";
import { getColor } from "@app/ui";

// Create a QueryClient instance

export default function UsersLayout() {
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
					title: "Users",
				}}
			/>
			<Stack.Screen
				name="users/[id]"
				options={{
					title: "User Details",
				}}
			/>
		</Stack>
	);
}
