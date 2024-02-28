import mongoose from "mongoose";
import { envs } from "src/config/env";

const connection = async () => {
  await mongoose.connect(envs.DATABASE_URL, {
    auth: {
      username: "user",
      password: "password",
    },
  });
};

connection()
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error", err));
