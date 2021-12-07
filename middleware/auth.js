import jwt from "jsonwebtoken";

export const auth=(request,response,next)=>{
    try{
    const token=request.header("x-admin-token");
    console.log(token);
    jwt.verify(token,process.env.Token_admin);
    next();
    }
    catch(err){
        response.status(401).send({error:err.message});
    }
}
// }
// export const manager=(request,response,next)=>{
//     try{
//     const token=request.header("x-manager-token");
//     console.log(token);
//     (jwt.verify(token,process.env.Token_manager || token,process.env.Token_manager));
    
//     next();
//     }
//     catch(err){
//         response.status(401).send({error:err.message});
//     }
// }
// export const emp=(request,response,next)=>{
//     try{
//     const token=request.header("x-emp-token");
//     console.log(token);
//     jwt.verify(token,process.env.Token_employee||
//     token,process.env.Token_manager ||
//     token,process.env.Token_admin);
//     next();
//     }
//     catch(err){
//         response.status(401).send({error:err.message});
//     }
// }