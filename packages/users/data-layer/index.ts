import type { User } from "../userTypes";

const fetchUsers = async (): Promise<User[]> => {
	const response = await fetch(
		"https://5e8df3d022d8cd0016a79dcd.mockapi.io/users",
	);
	return await response.json();
};

export { fetchUsers };
