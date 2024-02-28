import { Schema } from "mongoose";

type Meta = {
  version: number;
  createdAt: Date;
  updatedAt: Date;
};

export const Meta = new Schema<Meta>(
  {
    version: {
      type: Schema.Types.Number,
      default: 1,
    },
    createdAt: { type: Schema.Types.Date, default: Date.now },
    updatedAt: { type: Schema.Types.Date, default: Date.now },
  },
  { _id: false },
);
