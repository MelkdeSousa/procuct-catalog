import { Schema, model } from "mongoose";
import { Meta } from "./Meta";

export type User = {
	_id: Schema.Types.UUID;
	name: string;
	categories: Schema.Types.UUID[];
	meta: {
		version: number;
		createdAt: Date;
		updatedAt: Date;
	};
};

export const Users = new Schema<User>(
	{
		_id: Schema.Types.UUID,
		name: Schema.Types.String,
		categories: [
			{
				type: Schema.Types.UUID,
				ref: "categories",
			},
		],
		meta: Meta,
	},
	{ _id: false },
);

export const UserModel = model<User>("users", Users);
