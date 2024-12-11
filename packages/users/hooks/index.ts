import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../data-layer";

const useFetchUsers = () => {
	const { data, error, isLoading } = useQuery({
		queryKey: ["users"],
		queryFn: fetchUsers,
	});

	return { data, error, isLoading };
};

export { useFetchUsers };
