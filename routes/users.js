import express from "express";
import { Login,Getusersbyname,Allusers,Getleads,Addusers,DeleteUserByID } from "../helper.js";
const router = express.Router();
import {auth,manager,emp} from "../middleware/auth.js";



router.route("/login").post(async (request, response) => {
  console.log(request.body);
  const { username, password } = request.body;
  const userCredentials = await Login({username, password});
  if (userCredentials) response.json({message:"Signed in",token:userCredentials});
  else response.status(401).send({message:"invalid credentials"});
});
router.route("/:username").get(async (request, response) => {
    const {username}=request.params;
    const users = await Getusersbyname({username});
    response.send(users);
  });


  router.route("/").get(async(request,response)=>{
    try{
      const currentUser = await Allusers();
    response.send(currentUser);
    }
    catch(err){response.send(err)}
  });

//  router.get("/",async(request,response)=>{
//     try{
//       const currentUser = await Allusers();
//     response.send(currentUser);
//     }
//     catch(err){response.send(err)}
//   });

  router.route("/add").post(async(request,response)=>{
    const value= request.body;
    console.log(value);
    const currentUser = await Addusers({value});
    response.send(currentUser);
  });
  
  router.route("/:id").delete( async (request, response) => {
    const { id } = request.params;
    const deleting=await DeleteUserByID({id});
    response.send(deleting);
    
  });
export const userRouter = router;
