import { View, ScrollView, StyleSheet } from "react-native";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useFetchSingleUser, PersonCardDetails } from "@app/users";
import { LoadingSpinner, ErrorMessage } from "@app/ui";
import { useEffect } from "react";

const DetailUserPage = () => {
	const { id } = useLocalSearchParams<{ id: string }>();
	const navigation = useNavigation();
	const router = useRouter();
	const { data: user, isLoading, error } = useFetchSingleUser(id);

	useEffect(() => {
		if (user) {
			navigation.setOptions({ title: user.firstName });
		}
	}, [user, navigation]);

	if (isLoading) {
		return (
			<View style={styles.container}>
				<LoadingSpinner />
			</View>
		);
	}

	if (error || !user) {
		return <ErrorMessage message="Failed to load user" />;
	}

	return (
		<View style={styles.container}>
			<ScrollView contentContainerStyle={styles.scrollContent}>
				<PersonCardDetails
					data={user}
					onEmailPress={(email) => router.push("/users/modal/email?email=" + email)}
				/>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	scrollContent: {
		flexGrow: 1,
	},
});

export default DetailUserPage;
