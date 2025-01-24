const express = require('express');
const router = express.Router();
const borrowingController = require('../controllers/borrowingController');

router.post('/', borrowingController.createBorrowing);
router.post('/:id/return', borrowingController.returnBook);

module.exports = router;