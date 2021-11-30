import express from "express";
import { Login } from "../helper.js";
const router = express.Router();

router.route("/login").post(async (request, response) => {
  const { username, password } = request.body;
  
  const userCredentials = await Login({username, password});
  if (userCredentials) response.send("Signed in");
  else response.status(401).send("invalid credentials");
});
export const leadRouter = router;
