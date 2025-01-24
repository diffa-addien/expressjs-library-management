const db = require('../config/database');

class Borrowing {
  static async create(borrowing) {
    const { book_id, member_id, borrow_date, return_date, status } = borrowing;
    const query = `
      INSERT INTO borrowings (book_id, member_id, borrow_date, return_date, status) 
      VALUES ($1, $2, $3, $4, $5) RETURNING *
    `;
    const values = [book_id, member_id, borrow_date, return_date, status];
    const result = await db.query(query, values);
    return result.rows[0];
  }

  static async update(Id) {
    const query = `UPDATE borrowings SET status = 'RETURNED', return_date = $1 WHERE id =  $2`;
    const result = await db.query(query, [new Date(), Id]);
    return {"status": "Successfully returned"};
  }

  static async findByMemberId(memberId) {
    const query = `
      SELECT b.*, book.title, member.name 
      FROM borrowings b
      JOIN books book ON b.book_id = book.id
      JOIN members member ON b.member_id = member.id
      WHERE b.member_id = $1
    `;
    const result = await db.query(query, [memberId]);
    return result.rows;
  }

  static async findById(id) {
    const query = 'SELECT * FROM borrowings WHERE id = $1';
    const result = await db.query(query, [id]);
    return result.rows[0];
  }
  
  static async findActiveLoans(memberId) {
    const query = `
      SELECT COUNT(*) AS total FROM borrowings 
      WHERE status = 'BORROWED' AND member_id = $1
    `;
    const result = await db.query(query, [memberId]);
    return result.rows[0].total;
  }
}

module.exports = Borrowing;