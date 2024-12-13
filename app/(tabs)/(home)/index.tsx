import { useFetchUsers } from "@app/users";
import { StyleSheet, Text, View } from "react-native";

const HomeScreen = () => {
	const { data, isLoading } = useFetchUsers();
	return (
		<View style={styles.container}>
			<Text>Góðan daginn Haukur</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#c01383",
		padding: 8,
	},
});

export default HomeScreen;
