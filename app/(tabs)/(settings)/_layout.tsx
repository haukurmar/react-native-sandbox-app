import { Stack } from "expo-router";
import { getColor } from "@app/ui";

const SettingsLayout = () => {
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
				headerShadowVisible: false,
			}}
		>
			<Stack.Screen
				name="index"
				options={{
					title: "Settings",
				}}
			/>
		</Stack>
	);
};

export default SettingsLayout;
