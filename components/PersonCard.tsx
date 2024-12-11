import type { User } from "@app/users";
import { Text, View } from "react-native";

type PersonCardProps = {
	data: User;
};

const PersonCard = (props: PersonCardProps) => {
	const { data: user } = props;
	return (
		<View>
			<Text>{user.firstName}</Text>
			<Text>{user.lastName}</Text>
			{user.description && <Text>{user.description}</Text>}
		</View>
	);
};

export { PersonCard };
export type { PersonCardProps };
