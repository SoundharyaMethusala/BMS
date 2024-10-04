const jwt=require("jsonwebtoken");
const userModel = require("../models/userModel");
const emailHelper = require("../utils/emailHelper")
const bcrypt = require("bcrypt")

const createUser = async (req,res)=>{
    try{
        const body=req.body;
        const user=await userModel.findOne({email:body.email});
        if(user){
            return res.send({
                success:false,
                message:"User already registered"
            });
        }

        const newuser=await userModel(body);

        const saltRounds=10;
        const hashedPassword=await bcrypt.hash(body.password,saltRounds);
        newuser.password = hashedPassword;

        await newuser.save();
        res.send({
            success:true,
            message:"Registration Successful"
        })
    }
    catch(err){
        console.log(err);
        res.send({
            success:false,
            message:err.message
        })
    }
}

const readUser = async (req,res)=>{
    try{
        const user=await userModel.findOne({email:req.body.email});
       // console.log("login",user);
        if(!user){
            return res.send({
                success:false,
                message:"User doesn't exist.Please Register"
            })
        }

        const isMatch = await bcrypt.compare(req.body.password,user.password);
        if(!isMatch){
            return res.send({
                success:false,
                message:"Invalid Password"
            })
        }


        const token = jwt.sign({userId:user._id},process.env.JWT_SECRET_KEY,{expiresIn:"1d"})
        //console.log("login user")
        //console.log(user.name,user._id);
        //console.log("logintoken",token);
        res.send({
            success:true,
            message:"Login successful!!",
            data:token
        })
    }
    catch(err){
        console.log(err);
        res.send({
            success:false,
            message:"Error Occurred!!Please try again later!!"
        })
    }
}

const getCurrentUser=async (req,res)=>{
    // console.log(req);
    try{
     const userId=req.body.userId;
    // console.log(req.userId)
     const user=await userModel.findById(userId).select("-password");
    //console.log("getuser",req.body.userId);
     res.send({
         success:true,
         message:"user authenticated",
         data:user
     });
     }
     catch(err){
         res.send({
             success:false,
             message:err.message
         })
     }
 }

const generateOtp = ()=>{
    const otp = Math.floor(Math.random()*100000)+90000;
    return otp;
}

 const forgotPassword = async (req,res)=>{
    try{
        if(req.body.email === undefined){
            return res.send({
                success:false,
                message:"Email is required"
            })
        }
        const user=await userModel.findOne({email:req.body.email});
        if(!user){
            return res.send({
                success:false,
                message:"User with email doesn't exist"
            })
        }
        const otp=generateOtp();
        user.otp=otp;
        user.otpExpiry=Date.now()+5*60*1000;
        await user.save();
        await emailHelper("otp.html",user.email,{name:user.name,otp:user.otp},"OTP from BookyMyShow clone");
        res.send({
            success:true,
            message:"otp sent to your gmail"
        })
    }
    catch(err){
        res.send({
            success:false,
            message:err.message
        })
    }
 }


const resetPassword = async (req,res)=>{
    try{
        const resetDetails = req.body;
        if(!resetDetails.password || !resetDetails.otp){
            return res.send({
                success:false,
                message:"Password and otp are required"
            })
        }
        const user = await userModel.findOne({otp:resetDetails.otp});
        if(!user){
            return res.send({
                success:false,
                message:"Invalid otp"
            })
        }
        if(user.otpExpiry < Date.now()){
            return res.send({
                success:false,
                message:"Otp has expired"
            })
        }
        user.password = resetDetails.password;
        //console.log("user.password",user.password);
        user.otp=undefined;
        user.otpExpiry = undefined;
        await user.save();
        res.send({
            success:true,
            message:"Password reset successful!!",
            data:user
        })
    }
    catch(err){
        res.send({
            success:false,
            message:err.message
        })
    }
}


module.exports={
    createUser,
    readUser,
    getCurrentUser,
    forgotPassword,
    resetPassword
}