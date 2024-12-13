import { PersonCard } from "./PersonCard";
import { LoadingSpinner, ErrorMessage } from "@app/ui";
import { Link } from "expo-router";
import { TouchableOpacity } from "react-native";
import { useFetchUsers } from "../hooks";

export const PersonList = () => {
	const { data, isLoading, error } = useFetchUsers();

	if (isLoading) {
		return <LoadingSpinner />;
	}

	if (error) {
		return <ErrorMessage message="Error loading users" />;
	}

	if (!data?.length) {
		return <ErrorMessage message="No users found" />;
	}

	return (
		<>
			{data.map((user) => (
				<Link
					href={`/users/${user.id}`}
					key={user.id}
					asChild={true}
				>
					<TouchableOpacity>
						<PersonCard data={user} />
					</TouchableOpacity>
				</Link>
			))}
		</>
	);
};
