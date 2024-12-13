import { View, StyleSheet } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useFetchSingleUser, PersonCardDetails } from "@app/users";
import { LoadingSpinner, ErrorMessage } from "@app/ui";
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
		return <LoadingSpinner />;
	}

	if (error || !user) {
		return <ErrorMessage message="Failed to load user" />;
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
});

export default DetailUserPage;
