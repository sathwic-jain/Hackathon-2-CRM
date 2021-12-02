import express from "express";
import { Addlead,Getleads } from "../helper.js";
const router = express.Router();


router.route("/add").put(async(request,response)=>{
  const value= request.body;
  console.log(value);
  const currentUser = await Addlead({value});
  response.send(currentUser);
});
router.route("/all").post(async(request,response)=>{
  const currentUser = await Getleads();
  response.send(currentUser);
});
export const leadRouter = router;
