import { Stack } from "expo-router";

// Create a QueryClient instance

export default function HomeLayout() {
	return (
		<Stack
			screenOptions={{
				headerStyle: {
					backgroundColor: "#880e5d",
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
					title: "Home Page",
				}}
			/>
		</Stack>
	);
}
