import { useFetchUsers } from "@app/users";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
import { getColor } from "@app/ui";
import { useAuth } from "@app/auth";
import { jwtDecode } from "jwt-decode";

const HomeScreen = () => {
	const { data, isLoading } = useFetchUsers();
	const { isAuthenticated, login, logout, accessToken } = useAuth();

	const decodedToken = accessToken ? jwtDecode(accessToken) : null;

	return (
		<ScrollView style={styles.container}>
			<View style={styles.content}>
				<Text style={styles.title}>Góðan daginn Haukur</Text>
				<TouchableOpacity
					style={styles.loginButton}
					onPress={isAuthenticated ? logout : login}
				>
					<Text style={styles.loginButtonText}>
						{isAuthenticated ? "Logout" : "Login"}
					</Text>
				</TouchableOpacity>

				{isAuthenticated && (
					<>
						<View style={styles.tokenContainer}>
							<Text style={styles.tokenTitle}>Access Token:</Text>
							<Text style={styles.tokenText} numberOfLines={3}>
								{accessToken}
							</Text>
						</View>

						<View style={styles.tokenContainer}>
							<Text style={styles.tokenTitle}>Decoded Token:</Text>
							<Text style={styles.tokenText}>
								{JSON.stringify(decodedToken, null, 2)}
							</Text>
						</View>
					</>
				)}
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: getColor("neutral", 100),
	},
	content: {
		flex: 1,
		alignItems: "center",
		padding: 16,
		paddingTop: 48,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		color: getColor("neutral", 900),
		marginBottom: 24,
	},
	loginButton: {
		backgroundColor: getColor("brand", 600),
		paddingVertical: 12,
		paddingHorizontal: 24,
		borderRadius: 8,
		alignItems: "center",
		marginBottom: 24,
	},
	loginButtonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "600",
	},
	tokenContainer: {
		backgroundColor: getColor("neutral", 200),
		padding: 16,
		borderRadius: 8,
		width: "100%",
		marginBottom: 16,
	},
	tokenTitle: {
		fontSize: 16,
		fontWeight: "600",
		marginBottom: 8,
		color: getColor("neutral", 900),
	},
	tokenText: {
		fontSize: 12,
		fontFamily: "monospace",
		color: getColor("neutral", 700),
	},
});

export default HomeScreen;
