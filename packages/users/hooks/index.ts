import { useQuery } from "@tanstack/react-query";
import { fetchUsers, fetchSingleUser } from "../data-layer";

const useFetchUsers = () => {
	const { data, error, isLoading } = useQuery({
		queryKey: ["users"],
		queryFn: fetchUsers,
	});

	return { data, error, isLoading };
};

const useFetchSingleUser = (id: string) => {
	const { data, error, isLoading } = useQuery({
		queryKey: ["user", id],
		queryFn: () => fetchSingleUser(id),
	});

	return { data, error, isLoading };
};

export { useFetchUsers, useFetchSingleUser };
