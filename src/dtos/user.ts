import { User } from "@/database/mongo/models-and-schemas/User";

export const toUserOutput = (user: User) => {
	if (!user._id) return;

	return {
		id: user._id,
		categories: user.categories.map(({ _id: id }) => ({
			id,
		})),
	};
};
