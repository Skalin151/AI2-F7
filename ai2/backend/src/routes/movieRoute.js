const express = require('express');
const router = express.Router();

const movieController = require('../controllers/movieController');

router.post('/create', movieController.movie_create);
router.get('/list', movieController.movie_list);
router.put('/update/:id', movieController.movie_update);
router.get('/get/:id', movieController.movie_get);
router.post('/delete/:id', movieController.movie_delete);

module.exports = router;