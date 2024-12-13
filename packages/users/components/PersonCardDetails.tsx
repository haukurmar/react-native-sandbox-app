import type { User } from "../userTypes";
import { Image, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { format, parseISO } from "date-fns";

type PersonCardDetailsProps = {
	data: User;
};

const PersonCardDetails = (props: PersonCardDetailsProps) => {
	const { data: user } = props;

	return (
		<View style={styles.card}>
			<View style={styles.header}>
				{user.imageUrl ? (
					<Image
						source={{ uri: user.imageUrl }}
						style={styles.image}
					/>
				) : (
					<View style={[styles.image, styles.placeholderImage]} />
				)}
				<View style={styles.headerContent}>
					<Text style={styles.name}>
						{user.firstName} {user.lastName}
					</Text>
					<Text style={styles.username}>@{user.username}</Text>
				</View>
			</View>

			{user.bio && (
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>About</Text>
					<Text style={styles.bio}>{user.bio}</Text>
				</View>
			)}

			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Contact Information</Text>
				<View style={styles.contactItem}>
					<Ionicons name="mail-outline" size={20} color="#666" />
					<Text style={styles.contactText}>{user.email}</Text>
				</View>
				{user.phone && (
					<View style={styles.contactItem}>
						<Ionicons name="call-outline" size={20} color="#666" />
						<Text style={styles.contactText}>{user.phone}</Text>
					</View>
				)}
			</View>

			{user.dateOfBirth && (
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Personal</Text>
					<View style={styles.contactItem}>
						<Ionicons
							name="calendar-outline"
							size={20}
							color="#666"
						/>
						<Text style={styles.contactText}>
							{format(parseISO(user.dateOfBirth), "d. MMMM yyyy")}
						</Text>
					</View>
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	card: {
		backgroundColor: "#fff",
		borderRadius: 16,
		padding: 24,
		margin: 16,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.1,
		shadowRadius: 8,
		elevation: 5,
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 24,
	},
	headerContent: {
		flex: 1,
		marginLeft: 16,
	},
	image: {
		width: 80,
		height: 80,
		borderRadius: 40,
		marginRight: 16,
	},
	placeholderImage: {
		backgroundColor: "#E1E1E1",
	},
	name: {
		fontSize: 24,
		fontWeight: "700",
		color: "#1a1a1a",
		marginBottom: 8,
	},
	username: {
		fontSize: 14,
		color: "#666",
		marginBottom: 8,
	},
	section: {
		marginBottom: 24,
	},
	sectionTitle: {
		fontSize: 16,
		fontWeight: "600",
		color: "#1a1a1a",
		marginBottom: 16,
	},
	bio: {
		fontSize: 15,
		color: "#333",
		lineHeight: 22,
		marginBottom: 16,
	},
	contactItem: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 16,
	},
	contactText: {
		fontSize: 15,
		color: "#333",
		marginLeft: 12,
	},
});

export { PersonCardDetails };
export type { PersonCardDetailsProps };
