# Library Management System
Overview
A comprehensive Express.js backend for library management API, featuring book, member, and borrowing tracking with PostgreSQL database integration.

### System Requirements
- NPM v10.8.2
- Node.js v20.18.0
- Express.js v4.21.2
- PostgreSQL server 17
- pg (PostgreSQL client) v8.13.1
- uuid v11.0.5
- cors v2.8.5

## Setup Installation
`npm install`
#### Database Configuration
##### expressjs-library-api\config\database.js
const pool = new Pool({
  user: 'postgres',             // username PostgreSQL
  host: 'localhost',            // host database address
  database: 'expresslibrary',   // database name
  password: 'adminmaster',      // PostgreSQL Password
  port: 5432,                   // Port postgreSQL
});

## Database Setup
Execute SQL scripts to create tables:

-- Create Books Table
CREATE TABLE books (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
title VARCHAR(255) NOT NULL,
author VARCHAR(255) NOT NULL,
published_year INTEGER NOT NULL,
stock INTEGER NOT NULL DEFAULT 0,
isbn VARCHAR(13) UNIQUE NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Members Table
CREATE TABLE members (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
name VARCHAR(255) NOT NULL,
email VARCHAR(255) UNIQUE NOT NULL,
phone VARCHAR(15) NOT NULL,
address TEXT NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Borrowings Table
CREATE TABLE borrowings (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
book_id UUID REFERENCES books(id),
member_id UUID REFERENCES members(id),
borrow_date DATE NOT NULL,
return_date DATE,
status VARCHAR(10) NOT NULL DEFAULT 'BORROWED',
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

##### or restore with the sql provided
library_schema.sql
library_sample_data.sql

## Running Application
`npm start` or `node app.js`

## API Endpoints
### Books

GET `/api/books`: List all books with their current stock
- Query Parameters:
■ title (string): Filter by title (case-insensitive)
■ author (string): Filter by author (case-insensitive)
■ page (integer, default: 1)
■ limit (integer, default: 10)

### Members

POST `/api/members`: Create member
- Request Body:
{
    "name": "string",
    "email": "string",
    "phone": "string",
    "address": "string"
}

GET `/api/members/:id/borrowings`: Get member borrow history
- Path Parameters:
■ id: Member ID
- Query Parameters:
■ status: Filter by status (BORROWED/RETURNED)
■ page (integer, default: 1)
■ limit (integer, default: 10)

### Borrowings

POST `/api/borrowings`: Create borrowing
- Request Body:
{
"book_id": "uuid",
"member_id": "uuid"
}

POST `/api/borrowings/:id/return`: Return book
- Path Parameters:
■ id: Borrowing ID