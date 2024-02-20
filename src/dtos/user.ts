import { User } from "@/database/mongo/models-and-schemas/User";

export const toUserOutput = (user: User) => {
	return {
		id: user._id,
		name: user.name,
		categories: user.categories,
	};
};
