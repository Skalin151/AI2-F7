const express = require('express');
const router = express.Router();

const genreController = require('../controllers/genreController');

router.post('/create', genreController.genre_create_unique);
router.get('/list', genreController.genre_list);
router.put('/update/:id', genreController.genre_update);
router.get('/get/:id', genreController.genre_get);
router.post('/delete/:id', genreController.genre_delete);

module.exports = router;