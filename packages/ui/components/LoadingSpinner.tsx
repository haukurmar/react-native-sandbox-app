import { ActivityIndicator, StyleSheet, View } from "react-native";

type LoadingSpinnerProps = {
	color?: string;
	size?: "small" | "large";
};

const LoadingSpinner = ({ color = "#6b13c0", size = "large" }: LoadingSpinnerProps) => {
	return (
		<View style={styles.container}>
			<ActivityIndicator size={size} color={color} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#f5f5f5",
	},
});

export { LoadingSpinner };
export type { LoadingSpinnerProps };
