import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { getColor } from "@app/ui";

type EmailFormProps = {
	recipientEmail: string;
	onSend?: (subject: string, message: string) => void;
};

export const EmailForm = ({ recipientEmail, onSend }: EmailFormProps) => {
	const [subject, setSubject] = useState("");
	const [message, setMessage] = useState("");

	return (
		<View style={styles.container}>
			<View style={styles.content}>
				<Text style={styles.recipient}>To: {recipientEmail}</Text>

				<TextInput
					style={styles.input}
					placeholder="Subject"
					value={subject}
					onChangeText={setSubject}
				/>

				<TextInput
					style={[styles.input, styles.messageInput]}
					placeholder="Message"
					value={message}
					onChangeText={setMessage}
					multiline
					numberOfLines={4}
					textAlignVertical="top"
				/>
			</View>
		</View>
	);
};

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
