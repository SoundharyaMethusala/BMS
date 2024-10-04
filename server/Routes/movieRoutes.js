const {addMovie, getAllMovies, updateMovie, deleteMovie, getSingleMovie} = require('../controllers/movieController')

const router=require('express').Router();

router.post('/add',addMovie);
router.get('/get-all',getAllMovies);
router.get('/get/:id',getSingleMovie);
router.put('/update',updateMovie);
router.put('/delete',deleteMovie);


module.exports=router;