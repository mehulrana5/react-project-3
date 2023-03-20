const jwt = require('jsonwebtoken');
const JWT_SECRET = "hehe343%%324^2";

const fetchuser=(req,res,next)=>{
    const token=req.header('auth-token');
    if(!token){
        return res.status(401).send({error:'invalid token'})
    }
    try {
        const data=jwt.verify(token,JWT_SECRET)
        req.user=data.user
        next()  
    } catch (error) {
        res.status(401).send({error:"some error occured in fetcher user"})
    }  
}   
module.exports=fetchuser