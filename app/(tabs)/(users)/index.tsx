import { PersonCard } from "@app/components/PersonCard";
import { useFetchUsers } from "@app/users";
import { Link } from "expo-router";
import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

const UsersScreen = () => {
	const { data, isLoading } = useFetchUsers();
	return (
		<View style={styles.container}>
			<Text>Góðan daginn Haukur</Text>
			{isLoading ? (
				<Text>Sæki gögn...</Text>
			) : (
				<ScrollView>
					{data?.map((user) => (
						<Link
							href={`/users/${user.id}`}
							key={user.id}
							asChild={true}
						>
							<TouchableOpacity>
								<PersonCard data={user} />
							</TouchableOpacity>
						</Link>
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

export default UsersScreen;
