import { PersonCard } from "@app/components/PersonCard";
import { useFetchSingleUser } from "@app/users";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

const DetailUserPage = () => {
	const { id } = useLocalSearchParams<{ id: string }>();
	const { setOptions } = useNavigation();
	const { data: user, isLoading, error } = useFetchSingleUser(id);

	useEffect(() => {
		// Set appbar title when user data is loaded
		if (user) {
			setOptions({
				title: `${user.firstName} ${user.lastName}`,
			});
		}
	}, [user, setOptions]);

	if (isLoading) {
		return (
			<View style={styles.container}>
				<ActivityIndicator size="large" color="#6b13c0" />
			</View>
		);
	}

	if (error) {
		return (
			<View style={styles.container}>
				<Text>Error loading user</Text>
			</View>
		);
	}

	if (!user) {
		return (
			<View style={styles.container}>
				<Text>User not found</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<PersonCard data={user} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		backgroundColor: "#f5f5f5",
		justifyContent: "center",
	},
});

export default DetailUserPage;
