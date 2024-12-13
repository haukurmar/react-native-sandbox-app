import { PersonCard, useFetchUsers } from "@app/users";
import { LoadingSpinner, ErrorMessage } from "@app/ui";
import { Link } from "expo-router";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

const UsersScreen = () => {
	const { data, isLoading, error } = useFetchUsers();

	if (isLoading) {
		return <LoadingSpinner />;
	}

	if (error) {
		return <ErrorMessage message="Error loading users" />;
	}

	if (!data?.length) {
		return <ErrorMessage message="No users found" />;
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
});

export default UsersScreen;
