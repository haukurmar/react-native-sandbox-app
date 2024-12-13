import { StyleSheet, Text, View } from "react-native";

type ErrorMessageProps = {
	message: string;
	color?: string;
};

const ErrorMessage = ({ message, color = "#666" }: ErrorMessageProps) => {
	return (
		<View style={styles.container}>
			<Text style={[styles.text, { color }]}>{message}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#f5f5f5",
	},
	text: {
		fontSize: 16,
		fontWeight: "500",
	},
});

export { ErrorMessage };
export type { ErrorMessageProps };
