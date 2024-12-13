import { useFetchUsers } from "@app/users";
import { StyleSheet, Text, View } from "react-native";
import { getColor } from "@app/ui";

const HomeScreen = () => {
	const { data, isLoading } = useFetchUsers();
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Góðan daginn Haukur</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: getColor("neutral", 100),
		alignItems: "center",
		justifyContent: "center",
		padding: 8,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		color: getColor("neutral", 900),
	},
});

export default HomeScreen;
