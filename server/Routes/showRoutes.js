const router = require('express').Router();
const {getAllShow, addShow, updateShow, deleteShow, getShowById, getAllShowByTheatre, getAllTheatreByMovie} = 
require('../controllers/showController')

router.get('/get-all',getAllShow);
router.post('/get-show-by-id',getShowById);
router.post('/get-all-show-by-theatre',getAllShowByTheatre)
router.post('/get-all-theatre-by-movie',getAllTheatreByMovie)
router.post('/add',addShow);
router.post('/delete',deleteShow);
router.put('/update',updateShow);


module.exports=router;