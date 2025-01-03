import { StyleSheet, Text, View } from "react-native";

const NotFoundPage = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>Page Not Found</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#fff",
	},
	text: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#333",
	},
});

export default NotFoundPage;
