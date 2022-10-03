import mongoose from "mongoose";

export class MongoDbConnection {
  static async connectDb() {
    await mongoose
      .connect(process.env.URI_DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("Connected to MongoDb"))
      .catch((err) => console.log("Error: " + err));
  }
}
