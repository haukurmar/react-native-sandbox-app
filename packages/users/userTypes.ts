export type User = {
	id: number;
	username: string;
	firstName: string;
	lastName: string;
	email: string;
	phone?: string;
	description: string;
	bio?: string;
	imageUrl?: string;
	dateOfBirth?: string;
};
