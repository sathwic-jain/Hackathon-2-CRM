import { client } from "./index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function Login({ username, password }) {
  const userLOGIN = await client
    .db("CMR")
    .collection("users")
    .findOne({ username: username });

  if (userLOGIN) {
    //
    // console.log(userLOGIN.type);
    // const token = jwt.sign({ id: userLOGIN.type }, process.env.Token_admin);
    // console.log(token);
    //
    const pass = await bcrypt.compare(password, userLOGIN.password);
    if (pass) return "true";
    else return null;
  } else {
    console.log("INVALID CREDENTIALS");
    return null;
  }
}

export async function genPassword(password) {
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);
    return hashedpassword;
  }

export async function Addusers({value }) {
    // const client = await createConnection();
    const username=value.username;
    const password=value.password;
    const existing = await client
      .db("accounts")
      .collection("signup")
      .findOne({ username: username });
    if (existing) return "Username exists!!Try logging in🙌";
    // else if (
    //   !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%&*]).{8,}$/g.test(password)
    // )
    //   return "Password pattern not met";
    else {
      const hpassword = await genPassword(password);
      const Users = await client
        .db("accounts")
        .collection("signup")
        .insertOne({ value });
      return Users;
    }
  }


export async function Getusersbyname({username}) {
    const UserList = await client
      .db("CMR")
      .collection("users")
      .findOne({username:username});
      console.log(UserList);
    return UserList;
  }
  export async function Getusers() {
    const UserList = await client
      .db("CMR")
      .collection("users")
      .find({}).toArray();
      console.log(UserList)
    return UserList;
  }