const Borrowing = require('../models/borrowing');
const Book = require('../models/Book');
const { v4: uuidv4 } = require('uuid');

class BookService {
  async createBook(bookData) {
    // Validate input
    if (!bookData.title || !bookData.author) {
      throw new Error('Title and author are required');
    }

    // Generate UUID if not provided
    const bookToCreate = {
      id: bookData.id || uuidv4(),
      title: bookData.title,
      author: bookData.author,
      isbn: bookData.isbn || null,
      publication_year: bookData.publication_year || null
    };

    return Book.create(bookToCreate);
  }

  async getStockById(book) {
    const stock = await Borrowing.findActiveLoans(book.id);
    if (!stock) {
      throw new Error('Book stock not found');
    }
    return {"stock buatan": stock};
  }

  async getAllBooks(req = {}) {
    const { title = null, author = null, page = 1, limit = 10 } = req;
    const bookToCall = {
      title,
      author,
      page,
      limit,
    };
    
    const book = await Book.getAll(bookToCall);
    const totalPages = Math.ceil(book.totalRows / limit);
    const response = {
      data: book.rows,
      pagination: {
        "total": book.totalRows,
        "page": page,
        "limit": limit,
        "totalPages": totalPages
      }
    };
    if (!book) {
      throw new Error('(All) Book not found');
    }
    return response;
  }
}

module.exports = new BookService();