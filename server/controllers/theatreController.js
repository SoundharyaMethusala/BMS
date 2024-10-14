const theatreModel=require('../models/theatreModel')

const addTheatre = async (req,res)=>{
    try{
        const body=req.body;
        const newtheatre = new theatreModel(body);
        await newtheatre.save();
        res.send({
            success:true,
            message:"Theatre added successfully!!"
        })
    }
    catch(err){
        res.send({
            success:false,
            message:err.message
        })
    }
}

const getAllTheatres = async(req,res)=>{
    try{
        const allTheatres = await theatreModel.find();
        res.send({
            success:true,
            message:"All theatres fetched successfully!!",
            data:allTheatres
        })

    }
    catch(err){
        res.send({
            success:false,
            message:err.message
        })
    }
}


const getAllTheatreByOwner = async(req,res)=>{
    try{
        const owner=req.body.id;
        const theatres = await theatreModel.find({owner:owner});
        res.send({
            success:true,
            message:"Theatres for owners fetched successfully!!",
            data:theatres
        })
    }
    catch(err){
        res.send({
            success:false,
            message:err.message
        })
    }
}

const updateTheatre = async(req,res)=>{
    try{
        const body=req.body;
        const theatreId=body.theatreId;
        const theatre=await theatreModel.findById(theatreId);
        Object.keys(body).forEach((key)=>{
            if(key!=="theatreId" && key!=="_id"){
                theatre[key]=body[key];
            }
        });
        await theatre.save();
        res.send({
            success:true,
            message:"Theatre updated successfully"
        })
    }
    catch(err){
        res.send({
            success:false,
            message:err.message
        })
    }
}

const deleteTheatre = async (req,res)=>{
    try{
        const theatreId=req.body.id;
        console.log("req.body",req.body);
        await theatreModel.findByIdAndDelete(theatreId);
        res.send({
            success:true,
            message:"Theatre deleted successfully"
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
    addTheatre,
    getAllTheatres,
    updateTheatre,
    deleteTheatre,
    getAllTheatreByOwner
}