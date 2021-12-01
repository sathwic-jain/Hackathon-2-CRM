import express from "express";
import { Login,Getusers } from "../helper.js";
const router = express.Router();

// import { genPassword, Getusers } from "../helper.js";

router.route("/login").post(async (request, response) => {
  const { username, password } = request.body;
  
  const userCredentials = await Login({username, password});
  if (userCredentials) response.send({message:"Signed in"});
  else response.status(401).send({message:"invalid credentials"});
});
router.route("/signup/user").get(async (request, response) => {
    const users = await Getusers();
    response.send(users);
  });
export const userRouter = router;
