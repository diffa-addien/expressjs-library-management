const bookService = require('../services/bookService');

exports.createBook = async (req, res) => {
  try {
    const book = await bookService.createBook(req.body);
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllBooks = async (req, res) => {
  try {
    const book = await bookService.getAllBooks(req.body);
    res.json(book);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.getStockById = async (req, res) => {
  try {
    const book = await bookService.getStockById(req.body);
    res.json(book);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};