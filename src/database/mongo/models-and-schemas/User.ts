import { Schema, model } from "mongoose";
import { Meta } from "./Meta";

type User = {
	name: string;
	categories: Schema.Types.ObjectId[];
	meta: {
		version: number;
		createdAt: Date;
		updatedAt: Date;
	};
};

export const Users = new Schema<User>(
	{
		name: Schema.Types.String,
		categories: [
			{
				type: Schema.Types.ObjectId,
				ref: "Categories",
			},
		],
		meta: Meta,
	},
	{ _id: false },
);

export const UserModel = model<User>("Users", Users);
