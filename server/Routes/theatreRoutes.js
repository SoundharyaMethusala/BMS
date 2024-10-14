const router = require('express').Router();
const {addTheatre, updateTheatre, getAllTheatres, deleteTheatre, getAllTheatreByOwner} = require('../controllers/theatreController');


router.get('/get-all',getAllTheatres);
router.post('/get-all-theatre-by-owner',getAllTheatreByOwner);
router.post('/add',addTheatre);
router.put('/update',updateTheatre),
router.post('/delete',deleteTheatre);

module.exports=router;