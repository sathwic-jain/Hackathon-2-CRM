import express from "express";
import { Addlead,Getleads,Getleadbyid } from "../helper.js";
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
router.route("/:id").get(async (request, response) => {
  const {id}=request.params;
  const users = await Getleadbyid({id});
  response.send(users);
});
export const leadRouter = router;
