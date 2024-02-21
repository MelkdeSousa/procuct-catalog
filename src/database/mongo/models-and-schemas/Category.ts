import { Schema, model } from "mongoose";
import { Meta } from "./Meta";

export type Category = {
	_id: Schema.Types.UUID;
	title: string;
	description: string;
	ownerId: Schema.Types.UUID;
	meta: {
		version: number;
		createdAt: Date;
		updatedAt: Date;
	};
};

export const Categories = new Schema<Category>({
	_id: Schema.Types.UUID,
	title: Schema.Types.String,
	description: Schema.Types.String,
	ownerId: { type: Schema.Types.UUID, ref: "users" },
	meta: Meta,
});

export const CategoryModel = model<Category>("categories", Categories);
