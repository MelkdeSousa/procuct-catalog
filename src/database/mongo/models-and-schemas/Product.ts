import { Schema, model } from "mongoose";
import { Meta } from "./Meta";

export type Product = {
  _id: Schema.Types.ObjectId;
  title: string;
  description: string;
  price: number;
  categoryId: Schema.Types.ObjectId;
  ownerId: Schema.Types.ObjectId;
  meta: {
    version: number;
    createdAt: Date;
    updatedAt: Date;
  };
};

export const Products = new Schema<Product>({
  title: Schema.Types.String,
  description: Schema.Types.String,
  price: Schema.Types.Number,
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "categories",
  },
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  meta: Meta,
});

export const ProductModel = model<Product>("products", Products);
