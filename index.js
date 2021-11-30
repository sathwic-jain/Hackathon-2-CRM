import express from "express";
import { MongoClient } from "mongodb";
import { userRouter } from "./routes/users.js";
import dotenv from "dotenv";
import cors from "cors";
// import jwt from "jsonwebtoken";
dotenv.config();


const PORT=process.env.PORT||7000;
const app = express();
app.use(express.json());
app.use(cors());
app.listen(PORT,()=>{
    console.log(`listening to ${PORT}`);
});
app.get("/", (request, response) => {
    response.send("hello 👍😒🙌🙌😒😒");
  });
const MONGO_URL = process.env.MONGO_URL;
export async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("mongo connected");

  return client;
}
createConnection();
app.use("/users", userRouter);
app.use("/leads",userRouter);
const client = await createConnection();
// const token = jwt.sign({ id: userLOGIN.type }, process.env.SECRET_KEY);
//       console.log(token);
export {client};