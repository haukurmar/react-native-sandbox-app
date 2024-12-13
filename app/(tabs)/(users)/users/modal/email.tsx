import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getColor } from "@app/ui";
import { EmailForm } from "@app/users";

export default function EmailScreen() {
	const { email } = useLocalSearchParams<{ email: string }>();
	const router = useRouter();

	const handleSend = (subject: string, message: string) => {
		// Here we would typically integrate with an email service
		console.log("Sending email:", { to: email, subject, message });
		router.back();
	};

	return <EmailForm recipientEmail={email} onSend={handleSend} />;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	content: {
		padding: 24,
	},
	recipient: {
		fontSize: 14,
		color: getColor("neutral", 600),
		marginBottom: 16,
	},
	input: {
		borderWidth: 1,
		borderColor: getColor("neutral", 200),
		borderRadius: 8,
		padding: 12,
		marginBottom: 16,
		fontSize: 16,
	},
	messageInput: {
		height: 120,
	},
});
