import express from "express";
import { Login,Getusersbyname,Getusers,Addusers } from "../helper.js";
const router = express.Router();

// import { genPassword, Getusers } from "../helper.js";

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

  router.route("/all").post(async(request,response)=>{
      const users=await Getusers();
      response.send(users);
  })

  router.route("/add").put(async(request,response)=>{
    const value= request.body;
    console.log(value);
    const currentUser = await Addusers({value});
    response.send(currentUser);
  });
  
export const userRouter = router;
