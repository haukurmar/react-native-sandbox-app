import { StyleSheet, View } from "react-native";
import Animated, { useAnimatedScrollHandler } from "react-native-reanimated";
import { useScrollContext } from "@app/common";
import { getColor } from "@app/ui";
import { PersonList } from "@app/users";
import { useFetchUsers } from "@app/users";
import { LoadingSpinner } from "@app/ui";

export default function UsersScreen() {
	const { scrollY } = useScrollContext();
	const { isLoading } = useFetchUsers();

	const scrollHandler = useAnimatedScrollHandler({
		onScroll: (event) => {
			scrollY.value = event.contentOffset.y;
		},
	});

	if (isLoading) {
		return (
			<View style={[styles.container, styles.loadingContainer]}>
				<LoadingSpinner />
			</View>
		);
	}

	return (
		<Animated.ScrollView
			style={styles.container}
			onScroll={scrollHandler}
			scrollEventThrottle={16}
		>
			<PersonList />
		</Animated.ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: getColor("neutral", 100),
		padding: 8,
	},
	loadingContainer: {
		justifyContent: "center",
		alignItems: "center",
	},
});
