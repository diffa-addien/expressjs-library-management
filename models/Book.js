const db = require('../config/database');

class Book {
  static async create(book) {
    const { id, title, author, isbn, publication_year } = book;
    const query = `
      INSERT INTO books (id, title, author, isbn, publication_year) 
      VALUES ($1, $2, $3, $4, $5) RETURNING *
    `;
    const values = [id, title, author, isbn, publication_year];
    const result = await db.query(query, values);
    return result.rows[0];
  }

  static async findById(id) {
    const query = 'SELECT * FROM books WHERE id = $1';
    const result = await db.query(query, [id]);
    return result.rows[0];
  }

  static async stockById(id) {
    const query = 'SELECT stock FROM books WHERE id = $1';
    const result = await db.query(query, [id]);
    //const stock = parseInt(result.rows[0].stock);
    return result.rows[0].stock;
  }

  static async reduceStockById(id) {
    const query = 'UPDATE books SET stock = stock - 1 WHERE id =  $1';
    const result = await db.query(query, [id]);
    //const stock = parseInt(result.rows[0].stock);
    return result;
  }

  static async increaseStockById(id) {
    const query = 'UPDATE books SET stock = stock + 1 WHERE id =  $1';
    const result = await db.query(query, [id]);
    //const stock = parseInt(result.rows[0].stock);
    return result;
  }

  static async getAll(book) {
    const { title, author, page, limit } = book;
    const offset = (page - 1) * limit;
    
    // Query untuk menghitung total data
    const countQuery = `
      SELECT COUNT(*) AS total 
      FROM books
      WHERE ($1::text IS NULL OR LOWER(title) LIKE '%' || LOWER($1) || '%')
        AND ($2::text IS NULL OR LOWER(author) LIKE '%' || LOWER($2) || '%')
    `;
    const countValues = [title, author];
    const countResult = await db.query(countQuery, countValues);
    const totalRows = countResult.rows[0].total;

    const query = `
      SELECT * FROM books
      WHERE ($1::text IS NULL OR LOWER(title) LIKE '%' || LOWER($1) || '%')
        AND ($2::text IS NULL OR LOWER(author) LIKE '%' || LOWER($2) || '%')
      LIMIT $3 OFFSET $4;
    `;
    const values = [title, author, limit, offset];
    const result = await db.query(query, values);
    
    return {
      rows: result.rows,
      totalRows: totalRows
    };
  }
}

module.exports = Book;