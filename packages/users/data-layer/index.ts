import type { User } from "../userTypes";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchUsers = async (): Promise<User[]> => {
	await delay(3000);
	const response = await fetch(
		"https://5e8df3d022d8cd0016a79dcd.mockapi.io/users",
	);

	return await response.json();
};

const fetchSingleUser = async (id: string): Promise<User> => {
	await delay(300); // 2 second delay
	const response = await fetch(
		`https://5e8df3d022d8cd0016a79dcd.mockapi.io/users/${id}`,
	);

	return await response.json();
};

export { fetchUsers, fetchSingleUser };
