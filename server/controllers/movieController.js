const movieModel= require('../models/movieModel')

const addMovie=async (req,res)=>{
    try{
        const newmovie=await movieModel(req.body);
        await newmovie.save();
        res.send({
            success:true,
            message:"New movie has been added successfully"
        })
    }
    catch(err){
        res.send({
            success:false,
            message:err.message
        })
    }
}

const getAllMovies = async (req,res)=>{
    try{
        const allMovies=await movieModel.find();
        //console.log(allMovies);
        res.send({
            success:true,
            message:"All movies fetched successfully!!",
            data:allMovies
        })
    }
    catch(err){
        res.send({
            success:false,
            message:err.message
        })
    }
}

const updateMovie=async (req,res)=>{
    try{
        const body=req.body;
        const movieId=body.id;
        const movie=await movieModel.findById(movieId);
        Object.keys(body).forEach((key) => {
            if (key !== "id") movie[key] = body[key];
          });
        await movie.save();
        res.send({
            success:true,
            message:"Movie has been updated successfully"
        });
    }
    catch(err){
        res.send({
            success:false,
            message:err.message
        })
    }
}

const deleteMovie=async (req,res)=>{
    try{
        const id=req.body.id;
        await movieModel.findByIdAndDelete(id);
        res.send({
            success:true,
            message:"Movie has been deleted successfully!!"
        })
    }   
    catch(err){
        res.send({
            success:false,
            message:err.message
        })
    }
}

const getSingleMovie = async (req,res)=>{
    try{
        const movie=await movieModel.findById(req.params.id);
        res.send({
            success:true,
            message:"Movie fetched successfully!!",
            data:movie
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
    addMovie,
    getAllMovies,
    updateMovie,
    deleteMovie,
    getSingleMovie
}