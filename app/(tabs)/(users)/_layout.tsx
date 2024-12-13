import { Stack, useRouter } from "expo-router";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { getColor } from "@app/ui";

const UsersLayout = () => {
	const router = useRouter();
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
					presentation: "modal",
					headerTitle: "Contact Form",
					headerLeft: () => (
						<TouchableOpacity onPress={() => router.back()}>
							<Text
								style={[
									styles.headerButton,
									styles.cancelButton,
								]}
							>
								Cancel
							</Text>
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
};

const styles = StyleSheet.create({
	headerButton: {
		fontSize: 17,
		padding: 8,
	},
	cancelButton: {
		color: "#fff",
	},
	sendButton: {
		color: "#fff",
		fontWeight: "600",
	},
});

export default UsersLayout;
