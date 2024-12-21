import mongoose from "mongoose";

export function dbConnection() {
  try {
    mongoose.connect(
      "mongodb+srv://sivapucc:siva95@cluster0.zdqwd.mongodb.net/?"
    );
    console.log("DB connected successfully....");
  } catch (error) {
    console.log(error);
  }
}
