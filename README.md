# Library Management System
Overview
A comprehensive Express.js backend for library management, featuring book, member, and borrowing tracking with PostgreSQL database integration.

### Dependencies
- Node.js
- Express.js
- PostgreSQL
- pg (PostgreSQL client)
- uuid

## Setup Installation
npm install
Environment Configuration
Create .env file:
CopyDB_USER=your_username
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=library_db
PORT=3000

## Database Setup
Execute SQL scripts to create tables:

CREATE TABLE books (
  id UUID PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  isbn VARCHAR(50),
  publication_year INTEGER
);

CREATE TABLE members (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20)
);

CREATE TABLE borrowings (
  id UUID PRIMARY KEY,
  book_id UUID REFERENCES books(id),
  member_id UUID REFERENCES members(id),
  borrow_date DATE NOT NULL,
  return_date DATE,
  status VARCHAR(20) NOT NULL
);

### Running Application
npm start

## API Endpoints
### Books

POST /api/books: Create book
GET /api/books/:id: Get book by ID

### Members

POST /api/members: Create member
GET /api/members/:id: Get member by ID

### Borrowings

POST /api/borrowings: Create borrowing
POST /api/borrowings/return/:id: Return book