import jwt from "jsonwebtoken";

export const manager=(request,response,next)=>{
    try{
    const token=request.header("x-manager-token");
    console.log(token);
    (jwt.verify(token,process.env.Token_manager || process.env.Token_Administrator));
    
    next();
    }
    catch(err){
        response.status(401).send({error:err.message});
    }
}