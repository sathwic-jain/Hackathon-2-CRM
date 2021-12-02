import express from "express";
import { Addlead,Getleads,Getleadbyid,AddOnelead,DeleteLeadByID } from "../helper.js";
const router = express.Router();


router.route("/add").post(async(request,response)=>{
  const value= request.body;
  console.log(value);
  const currentUser = await Addlead({value});
  response.send(currentUser);
});
router.route("/all").get(async(request,response)=>{
  const currentUser = await Getleads();
  response.send(currentUser);
});
router.route("/:id").get(async (request, response) => {
  const {id}=request.params;
  const users = await Getleadbyid({id});
  response.send(users);
});
router.route("/:id").delete( async (request, response) => {
  const { id } = request.params;
  const deleting=await DeleteLeadByID({id});
  response.send(deleting);
  
});

router.route("/add/:id").put(async(request,response)=>{
  const{id}=request.params;
  const value= request.body;
  console.log(value);
  const currentUser = await AddOnelead({id,value});
  response.send(currentUser);
});
export const leadRouter = router;
