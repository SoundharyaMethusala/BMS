const jwt=require('jsonwebtoken')

module.exports=function authMiddleware(req,res,next){
    try{
        const token=req.headers.authorization.split(' ')[1];
        console.log("Authorization token",req.headers.authorization);
       console.log("authmiddlewaretoken",token);
        const verifieduser=jwt.verify(token,process.env.JWT_SECRET_KEY);
        console.log(verifieduser);
        req.body.userId=verifieduser.userId;
     //   console.log(" authmiddleware userID")
      //console.log(req.body.userId)
        next();
    }
    catch(err){
        res.send({
            success:false,
            message:"Unauthorized user"
        })
    }
}