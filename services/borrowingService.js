const Borrowing = require('../models/borrowing');
const Book = require('../models/Book');
const Member = require('../models/member');
const { v4: uuidv4 } = require('uuid');

class BorrowingService {
  async createBorrowing(borrowingData) {
    // Validate required fields
    if (!borrowingData.book_id || !borrowingData.member_id) {
      throw new Error('Book ID and Member ID are required');
    }

    // Check if book exists
    const book = await Book.findById(borrowingData.book_id);
    if (!book) {
      throw new Error('Book not found');
    }

    // Check if member exists
    const member = await Member.findById(borrowingData.member_id);
    if (!member) {
      throw new Error('Member not found');
    }

    // Check for active borrowings of the same book
    const activeBorrowings = await Borrowing.findActiveLoans(borrowingData.member_id);
    // const isBookAlreadyBorrowed = activeBorrowings.some(
    //   b => b.book_id === borrowingData.book_id
    // );
    if (activeBorrowings >= 3) {
      throw new Error('cant borrow than 3 books');
    }

    const bookStock = await Book.stockById(borrowingData.book_id);
    if (bookStock == 0){
      throw new Error('book out of stock');
    }else{
      await Book.reduceStockById(book.id);
    }


    // Prepare borrowing data
    const borrowingToCreate = {
      id: borrowingData.id || uuidv4(),
      book_id: borrowingData.book_id,
      member_id: borrowingData.member_id,
      borrow_date: borrowingData.borrow_date || new Date(),
      return_date: borrowingData.return_date || null,
      status: borrowingData.status || 'BORROWED'
    };

    return Borrowing.create(borrowingToCreate);
  }

  async returnBook(borrowingId) {
    const borrowing = await Borrowing.findById(borrowingId);
    if (!borrowing) {
      throw new Error('Borrowing record not found');
    }

    if (borrowing.status === 'RETURNED') {
      throw new Error('Book already returned');
    }

    await Book.increaseStockById(borrowing.book_id);

    return Borrowing.update(borrowingId);
  }
}

module.exports = new BorrowingService();