import mongoose from "mongoose";

const connection = mongoose.createConnection(
	"mongodb://localhost:27017/catalog",
	{
		auth: {
			username: "root",
			password: "password",
		},
		authSource: "admin",
	},
);

connection.on("error", () => console.log("Could not connect to MongoDB"));
connection.once("open", () => console.log("Connected to MongoDB"));
