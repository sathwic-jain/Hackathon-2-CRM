import express from "express";
import { Addlead } from "../helper.js";
const router = express.Router();


router.route("/add").put(async(request,response)=>{
  const value= request.body;
  console.log(value);
  const currentUser = await Addlead({value});
  response.send(currentUser);
});
export const leadRouter = router;
