const borrowingService = require('../services/borrowingService');

exports.createBorrowing = async (req, res) => {
  try {
    const borrowing = await borrowingService.createBorrowing(req.body);
    res.status(201).json(borrowing);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.returnBook = async (req, res) => {
  try {
    const borrowing = await borrowingService.returnBook(req.params.id);
    res.json(borrowing);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};