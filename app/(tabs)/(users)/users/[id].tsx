import { View, ActivityIndicator, Text, StyleSheet } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useFetchSingleUser, PersonCardDetails } from "@app/users";
import { useEffect } from "react";

const DetailUserPage = () => {
	const { id } = useLocalSearchParams<{ id: string }>();
	const { setOptions } = useNavigation();
	const { data: user, isLoading, error } = useFetchSingleUser(id);

	useEffect(() => {
		if (user) {
			setOptions({
				title: `${user.firstName} ${user.lastName}`,
			});
		}
	}, [user, setOptions]);

	if (isLoading) {
		return (
			<View style={[styles.container, styles.centered]}>
				<ActivityIndicator size="large" color="#6b13c0" />
			</View>
		);
	}

	if (error || !user) {
		return (
			<View style={[styles.container, styles.centered]}>
				<Text style={styles.errorText}>Failed to load user</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<PersonCardDetails data={user} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f5f5f5",
	},
	centered: {
		justifyContent: "center",
		alignItems: "center",
	},
	errorText: {
		color: "#666",
		fontSize: 16,
		fontWeight: "500",
	},
});

export default DetailUserPage;
