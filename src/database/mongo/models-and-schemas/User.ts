import { Schema, model } from "mongoose";
import { Category } from "./Category";
import { Meta } from "./Meta";

export type User = {
  _id: Schema.Types.ObjectId;
  name: string;
  categories: Category[];
  meta: {
    version: number;
    createdAt: Date;
    updatedAt: Date;
  };
};

export const Users = new Schema<User>({
  name: Schema.Types.String,
  meta: Meta,
});

Users.virtual("categories", {
  ref: "categories",
  localField: "_id",
  foreignField: "ownerId",
  justOne: false,
});

export const UserModel = model<User>("users", Users);
