import { client } from "./index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ObjectId } from "bson";

export async function Login({ username, password }) {
  const userLOGIN = await client
    .db("CMR")
    .collection("users")
    .findOne({ username: username });

  if (userLOGIN) {
    
    console.log(userLOGIN.type);
    const token = jwt.sign({ id: userLOGIN.type }, process.env.Token[type]);
    console.log(token);
    localStorage.setItem("token",token);
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
      .db("CMR")
      .collection("users")
      .findOne({ username: username });
    if (existing) return "Username exists!!Try logging in🙌";
    // else if (
    //   !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%&*]).{8,}$/g.test(password)
    // )
    //   return "Password pattern not met";
    else {
      const hpassword = await genPassword(password);
      value.password=hpassword;
      const Users = await client
        .db("CMR")
        .collection("users")
        .insertOne(value);
      return Users;
    }
  }

  
export async function Addlead({value }) {
  
    const Users = await client
      .db("LEADS")
      .collection("lead")
      .insertOne( value );
    return Users;
  }
  export async function Getleadbyid({id}) {
    const UserList = await client
      .db("LEADS")
      .collection("lead")
      .findOne({_id:ObjectId(id)});
      console.log(UserList);
    return UserList;
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
  export async function Getleads() {
    const UserList = await client
      .db("LEADS")
      .collection("lead")
      .find({}).toArray();
      console.log(UserList)
    return UserList;
  }