import { Stack, useRouter } from "expo-router";
import { getColor } from "@app/ui";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function UsersLayout() {
	const router = useRouter();

	return (
		<Stack
			screenOptions={{
				headerShown: false,
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
					title: "Users",
				}}
			/>
			<Stack.Screen
				name="users/[id]"
				options={{
					title: "",
				}}
			/>
			<Stack.Screen
				name="users/modal/email"
				options={{
					title: "Send Email",
					presentation: "modal",
					headerStyle: {
						backgroundColor: "#fff",
					},
					headerTintColor: getColor("neutral", 900),
					headerLeft: () => (
						<TouchableOpacity onPress={() => router.back()}>
							<Text style={styles.headerButton}>Cancel</Text>
						</TouchableOpacity>
					),
					headerRight: () => (
						<TouchableOpacity
							onPress={() => console.log("Send action triggered")}
						>
							<Text
								style={[styles.headerButton, styles.sendButton]}
							>
								Send
							</Text>
						</TouchableOpacity>
					),
				}}
			/>
		</Stack>
	);
}

const styles = StyleSheet.create({
	headerButton: {
		fontSize: 17,
		color: getColor("brand", 500),
	},
	sendButton: {
		fontWeight: "600",
	},
});
