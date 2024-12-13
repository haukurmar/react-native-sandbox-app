import { StyleSheet, View, ScrollView } from "react-native";
import { getColor } from "@app/ui";
import { PersonList } from "@app/users";

const UsersScreen = () => {
	return (
		<View style={styles.container}>
			<ScrollView>
				<PersonList />
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: getColor("neutral", 100),
		padding: 8,
	},
});

export default UsersScreen;
