import express from "express";
import { Login,Getusersbyname,Allusers,Addusers } from "../helper.js";
const router = express.Router();
import {auth,manager,emp} from "../middleware/auth.js";


router.route("/login").post(async (request, response) => {
  const { username, password } = request.body;
  const userCredentials = await Login({username, password});
  if (userCredentials) response.send({message:"Signed in"});
  else response.status(401).send({message:"invalid credentials"});
});
router.route("/:username").get(async (request, response) => {
    const {username}=request.params;
    const users = await Getusersbyname({username});
    response.send(users);
  });

  router.route("/all").get(async(request,response)=>{
    console.log("shit");
    const currentUser = await Allusers();
    response.send(currentUser);
  });

  router.route("/add").post(async(request,response)=>{
    const value= request.body;
    console.log(value);
    const currentUser = await Addusers({value});
    response.send(currentUser);
  });
  
export const userRouter = router;
