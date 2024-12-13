import { PersonCard } from "@app/components/PersonCard";
import { useFetchUsers } from "@app/users";
import { Link } from "expo-router";
import {
	ActivityIndicator,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

const UsersScreen = () => {
	const { data, isLoading, error } = useFetchUsers();

	if (isLoading) {
		return (
			<View style={[styles.container, styles.centered]}>
				<ActivityIndicator size="large" color="#fff" />
			</View>
		);
	}

	if (error) {
		return (
			<View style={[styles.container, styles.centered]}>
				<Text style={styles.errorText}>Error loading users</Text>
			</View>
		);
	}

	if (!data?.length) {
		return (
			<View style={[styles.container, styles.centered]}>
				<Text style={styles.errorText}>No users found</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<ScrollView>
				{data.map((user) => (
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
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#964fda",
		padding: 8,
	},
	centered: {
		justifyContent: "center",
		alignItems: "center",
	},
	errorText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "500",
	},
});

export default UsersScreen;
