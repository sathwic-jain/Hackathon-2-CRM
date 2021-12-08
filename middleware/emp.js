import jwt from "jsonwebtoken";

export const emp=(request,response,next)=>{
    try{
    const token=request.header("x-emp-token");
    console.log(token);
    jwt.verify(token,process.env.Token_employee||
    token,process.env.Token_manager ||
    token,process.env.Token_admin);
    next();
    }
    catch{
        try{
            const token=request.header("x-manager-token");
            console.log(token);
            (jwt.verify(token,process.env.Token_Manager));
            next();
            }
            catch{
                try{
                    const token=request.header("x-manager-token");
                    console.log(token);
                    jwt.verify(token,process.env.Token_Administrator);
                    next();
                    }
                    catch(err){
                        response.status(401).send({error:err.message});
                    }
              
            }
    }
}