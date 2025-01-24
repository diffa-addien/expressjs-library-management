const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// router.post('/', bookController.createBook);
// router.get('/:id', bookController.getBookById);
router.get('/', bookController.getAllBooks);
router.get('/id', bookController.getStockById);

module.exports = router;