const db = require('../config/database');

class Member {
  static async create(member) {
    const { id, name, email, phone, address } = member;
    const query = `
      INSERT INTO members (id, name, email, phone, address) 
      VALUES ($1, $2, $3, $4, $5) RETURNING *
    `;
    const values = [id, name, email, phone, address];
    const result = await db.query(query, values);
    return result.rows[0];
  }

  static async history(data) {
    const { status, page, limit, memId } = data;
    const offset = (page - 1) * limit;

    // Query untuk menghitung total data
    const countQuery = `
      SELECT COUNT(*) AS total 
      FROM borrowings
      WHERE status = $1 AND member_id = $2
    `;
    const countValues = [status, memId];
    const countResult = await db.query(countQuery, countValues);
    const totalRows = countResult.rows[0].total;

    const query = `
      SELECT b.id AS borrowing_id, 
      b.book_id, 
      b.member_id, 
      b.borrow_date, 
      b.return_date, 
      b.status,
      book.title,
      book.author,
      book.isbn
      FROM borrowings b
      JOIN books book ON b.book_id = book.id
      WHERE status = $1 AND member_id = $2
      LIMIT $3 OFFSET $4
    `;
    const result = await db.query(query, [status, memId, limit, offset] );
    return {
      rows: result.rows,
      totalRows: totalRows
    };
  }

  static async findById(id) {
    const query = 'SELECT * FROM members WHERE id = $1';
    const result = await db.query(query, [id]);
    return result.rows[0];
  }
}

module.exports = Member;