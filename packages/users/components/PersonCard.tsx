import type { User } from "../userTypes";
import { Image, StyleSheet, Text, View } from "react-native";

type PersonCardProps = {
	data: User;
};

const PersonCard = (props: PersonCardProps) => {
	const { data: user } = props;
	return (
		<View style={styles.card}>
			{user.imageUrl ? (
				<Image source={{ uri: user.imageUrl }} style={styles.image} />
			) : (
				<View style={[styles.image, styles.placeholderImage]} />
			)}
			<View style={styles.content}>
				<Text style={styles.name}>{user.firstName} {user.lastName}</Text>
				{user.description && <Text style={styles.description}>{user.description}</Text>}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	card: {
		flexDirection: 'row',
		backgroundColor: '#fff',
		borderRadius: 8,
		padding: 12,
		marginVertical: 8,
		marginHorizontal: 16,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	image: {
		width: 60,
		height: 60,
		borderRadius: 30,
		marginRight: 12,
	},
	placeholderImage: {
		backgroundColor: '#E1E1E1',
	},
	content: {
		flex: 1,
		justifyContent: 'center',
	},
	name: {
		fontSize: 16,
		fontWeight: '600',
		marginBottom: 4,
	},
	description: {
		fontSize: 14,
		color: '#666',
	},
});

export { PersonCard };
export type { PersonCardProps };
