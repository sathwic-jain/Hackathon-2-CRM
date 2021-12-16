import { client } from "./index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ObjectId } from "bson";
import nodemailer from "nodemailer";

export async function Login({ username, password }) {
  const userLOGIN = await client
    .db("CMR")
    .collection("users")
    .findOne({ username: username });

  if (userLOGIN) {
    console.log("a");
    console.log(userLOGIN.type);
    const type=(userLOGIN.type);
   var token_type;
    if(type==="Administrator") token_type=process.env.Token_Administrator;
    else if(type==="Manager")token_type=process.env.Token_Manager;
    else if(type==="employee") token_type=process.env.Token_Employee;
    const pass = await bcrypt.compare(password, userLOGIN.password);
    // console.log(pass);
    if (pass) {
       const token = jwt.sign({ id: userLOGIN._id }, token_type);
       console.log(token);
    return token;
    
  }
    else return null;
  } else {
    console.log("INVALID CREDENTIALS");
    return null;
  }
}

export async function Forgot({username}){
  const user=await client.db("CMR").collection("users").findOne({username:username})
  if(user){
    const token = jwt.sign({ id: user._id }, user.username);
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.user,
        pass: process.env.pass
      }
    })
    
    const mailOptions = {
      from: 'testing.00k@gmail.com',
      to: `${username}`,
      subject: `Reset your password`,
      text: "http://localhost:3000/reset/"+token,
      replyTo: `test`
    }
    transporter.sendMail(mailOptions, function(err, res) {
      if (err) {
        console.error('there was an error: ', err);
      } else {
        console.log('here is the res: ', res)
      }
    })
    return token;
  }
  
  else return null;
}
export async function genPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hashedpassword = await bcrypt.hash(password, salt);
  return hashedpassword;
}

export async function Addusers({ value }) {
  const username = value.username;
  const password = value.password;
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
    value.password = hpassword;
    const Users = await client.db("CMR").collection("users").insertOne(value);
    return Users;
  }
}

export async function Addlead({ value }) {
  const Users = await client.db("LEADS").collection("lead").insertOne(value);
  return Users;
}
export async function AddOnelead({ id, value }) {
  const Users = await client
    .db("LEADS")
    .collection("lead")
    .updateMany(
      { _id: ObjectId(id) },
      {
        $set: {
          Phone: value.Phone,
          name: value.name,
          email: value.email,
          status: value.status,
          description: value.description,
        },
      }
    );
  return Users;
}
export async function Getleadbyid({ id }) {
  const UserList = await client
    .db("LEADS")
    .collection("lead")
    .findOne({ _id: ObjectId(id) });
  console.log(UserList);
  return UserList;
}
export async function DeleteLeadByID({id}) {
  const user=await client
    .db("LEADS")
    .collection("lead")
    .deleteOne({ _id: ObjectId(id) });
  return user;
}
export async function DeleteUserByID({id}) {
  const user=await client
    .db("CMR")
    .collection("users")
    .deleteOne({ _id: ObjectId(id) });
  return user;
}
export async function Getusersbyname({ username }) {
  const UserList = await client
    .db("CMR")
    .collection("users")
    .findOne({ username: username });
  return UserList;
}
export async function Allusers() {
  const UserList = await client
    .db("CMR")
    .collection("users")
    .find({})
    .toArray();
    console.log(UserList);
  return UserList;
}
export async function Getleads(){ 
  const UserList = await client
    .db("LEADS")
    .collection("lead")
    .find({})
    .toArray();
  return UserList;
}

export async function Reset({ email,password,token }) {
  const User = await client
    .db("CMR")
    .collection("users")
    .findOne({ username: email });
  if(User){
    try{
    const pass=jwt.verify(token,email);
    }catch{return "wrong token"}
    {
      const hpassword = await genPassword(password);
      const userReset = await client
      .db("CMR")
      .collection("users")
      .updateOne(
        { _id: ObjectId(User._id) },
        {
          $set: {
            password:hpassword,
          },
        }
      );
      return ("found");
    }
  }else return ("not found");
}