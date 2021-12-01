import express from "express";
import { Login,Getusersbyname } from "../helper.js";
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
export const userRouter = router;
