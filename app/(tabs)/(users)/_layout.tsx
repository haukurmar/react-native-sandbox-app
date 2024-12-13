import { Stack } from "expo-router";

// Create a QueryClient instance

export default function UsersLayout() {
	return (
		<Stack
			screenOptions={{
				headerStyle: {
					backgroundColor: "#6b13c0",
				},
				headerTintColor: "#fff",
				headerTitleStyle: {
					fontWeight: "500",
				},
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
				name="users"
				options={{
					headerShown: true,
					title: "",
				}}
			/>
		</Stack>
	);
}
