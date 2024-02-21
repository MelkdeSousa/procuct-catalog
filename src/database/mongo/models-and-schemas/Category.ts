import { Schema, model } from "mongoose";
import { Meta } from "./Meta";

export type Category = {
	_id: Schema.Types.ObjectId;
	title: string;
	description: string;
	ownerId: Schema.Types.ObjectId;
	meta: {
		version: number;
		createdAt: Date;
		updatedAt: Date;
	};
};

export const Categories = new Schema<Category>({
	title: Schema.Types.String,
	description: Schema.Types.String,
	ownerId: { type: Schema.Types.ObjectId, ref: "users" },
	meta: Meta,
});

export const CategoryModel = model<Category>("categories", Categories);
