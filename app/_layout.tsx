import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";

// Create a QueryClient instance
const queryClient = new QueryClient();

export default function RootLayout() {
	return (
		<QueryClientProvider client={queryClient}>
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
					name="(tabs)"
					options={{
						headerShown: false,
						title: "",
					}}
				/>
				<Stack.Screen
					name="+not-found"
					options={{
						title: "Oops! Page not found",
					}}
				/>
			</Stack>
		</QueryClientProvider>
	);
}
