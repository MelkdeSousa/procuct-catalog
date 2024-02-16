import mongoose from "mongoose";
import { envs } from "src/config/env";

const connection = mongoose.createConnection(envs.DATABASE_URL, {
	auth: {
		username: "user",
		password: "password",
	},
});

connection.on("error", () => console.log("Could not connect to MongoDB"));
connection.once("open", () => console.log("Connected to MongoDB"));
