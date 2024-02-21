import { Schema, model } from "mongoose";
import { Meta } from "./Meta";

export type Product = {
	_id: Schema.Types.UUID;
	title: string;
	description: string;
	price: number;
	categoryId: Schema.Types.UUID;
	ownerId: Schema.Types.UUID;
	meta: {
		version: number;
		createdAt: Date;
		updatedAt: Date;
	};
};

export const Products = new Schema<Product>({
	_id: Schema.Types.UUID,
	title: Schema.Types.String,
	description: Schema.Types.String,
	price: Schema.Types.Number,
	categoryId: {
		type: Schema.Types.UUID,
		ref: "categories",
	},
	ownerId: {
		type: Schema.Types.UUID,
		ref: "users",
	},
	meta: Meta,
});

export const ProductModel = model<Product>("products", Products);
