const showModel = require('../models/showModel');

const addShow = async (req,res)=>{
    try{
        const newShow=await showModel(req.body);
        await newShow.save();
        res.send({
            success:true,
            message:"Show added successfully"
        })
    }
    catch(err){
        res.send({
            success:false,
            message:err.message
        })
    }
}

const getAllShow = async (req,res)=>{
    try{
        const shows = await showModel.find();
        res.send({
            success:true,
            message:"All shows fetched successfully!!",
            data:shows
        })
    }
    catch(err){
        res.send({
            success:false,
            message:err.message
        })
    }
}

const updateShow = async (req,res)=>{
    try{
        const id=req.body.id;
        const body=req.body;
        const show=await showModel.findById(id);
        Object.keys(body).forEach((key)=>{
            if(key!=="id"){
            show[key] = body[key];
            }
        })
        await show.save();
        res.send({
            success:true,
            message:"Show updated successfully!!"
        })
    }
    catch(err){
        res.send({
            success:false,
            message:err.message
        })
    }
}

const deleteShow = async(req,res)=>{
    try{
        const id=req.body.id;
        await showModel.findByIdAndDelete(id);
        res.send({
            success:true,
            message:"Show deleted successfully!!"
        })
    }
    catch(err){
        res.send({
            success:false,
            message:err.message
        })
    }
}

const getAllShowByTheatre = async (req,res)=>{
    try{
        const theatreId=req.body.theatreId;
        const shows = await showModel.find({theatre:theatreId}).populate("movie");
        res.send({
            success:true,
            message:"All shows for theatres has been shown",
            data:shows
        })
    }
    catch(err){
        res.send({
            success:false,
            message:err.message
        })
    }
}

const getShowById = async (req,res)=>{
    try{
        const showId=req.body.showId;
        const show = await showModel.findById(showId).populate("movie").populate("theatre");
        res.send({
            success:true,
            message:"Show has been fetched",
            data:show
        })
    }
    catch(err){
        res.send({
            success:false,
            message:err.message
        })
    }
}

const getAllTheatreByMovie = async(req,res)=>{
    try{
        const {movie,date} = req.body;
        const shows = await showModel.find({
            movie:movie,date:date
        }).populate("theatre");
        const uniqueTheatres = [];
        shows.forEach((show)=>{
            let isTheatre=uniqueTheatres.find((theatre)=>
            theatre._id === show.theatre._id
        )
        if(!isTheatre){
            let showOfThisTheatre = shows.filter((showobj)=>showobj.theatre._id == show.theatre._id);
            uniqueTheatres.push({...show.theatre._doc,shows:showOfThisTheatre})
        }
    })

        res.send({
            success:true,
            message:"All Theatre having shows for this movie fetched successfully",
            data:uniqueTheatres
        })
    }
    catch(err){
        res.send({
            success:false,
            message:err.message
        })
    }
}

module.exports = {
    addShow,
    deleteShow,
    updateShow,
    getAllShow,
    getAllShowByTheatre,
    getShowById,
    getAllTheatreByMovie
}