import { PersonCard } from "@app/components/PersonCard";
import { useFetchUsers } from "@app/users";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const HomeScreen = () => {
	const { data, isLoading } = useFetchUsers();
	return (
		<View style={styles.container}>
			<Text>Góðan daginn Haukur</Text>
			{isLoading ? (
				<Text>Sæki gögn...</Text>
			) : (
				<ScrollView>
					{data?.map((user) => (
						<PersonCard key={user.id} data={user} />
					))}
				</ScrollView>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#964fda",
		padding: 8,
	},
});

export default HomeScreen;
