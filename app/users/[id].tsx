import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";

const DetailUserPage = () => {
	const { id } = useLocalSearchParams<{ id: string }>();
	const { setOptions } = useNavigation();

	useEffect(() => {
		// Set appbar title
		setOptions({
			title: `User ${id}`,
		});
	}, [id, setOptions]);

	return (
		<View>
			<Text>DetailUserPage {id}</Text>
		</View>
	);
};

export default DetailUserPage;
