import express from "express";
import { Login,Getusersbyname,Allusers,Getleads,Addusers,DeleteUserByID } from "../helper.js";
const router = express.Router();
import {auth} from "../middleware/auth.js";
import {manager} from "../middleware/manager.js";



router.route("/login").post(async (request, response) => {
  console.log(request.body);
  const { username, password } = request.body;
  const userCredentials = await Login({username, password});
  if (userCredentials){
    console.log(userCredentials);
    response.send({message:"Signed up",token:userCredentials});
}
  else response.status(401).send({message:"invalid credentials"});
});

router.route("/forgot").post(async (request, response) => {
  console.log(request.body);
  const { username } = request.body;
  const userName = await Forgot({username});
  if (userName){
    console.log(userName);
    response.send({message:"Signed up"});
}
  else response.status(401).send({message:"invalid credentials"});
});

router.route("/:username").get(async (request, response) => {
    const {username}=request.params;
    const users = await Getusersbyname({username});
    response.send(users);
  });


  router.route("/").get(manager,async(request,response)=>{
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

  router.route("/add").post(auth,async(request,response)=>{
    const value= request.body;
    console.log(value);
    const currentUser = await Addusers({value});
    response.send(currentUser);
  });
  
  router.route("/:id").delete(auth,async (request, response) => {
    const { id } = request.params;
    const deleting=await DeleteUserByID({id});
    response.send(deleting);
    
  });
export const userRouter = router;
