const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',             // username PostgreSQL
  host: 'localhost',            // Alamat host database
  database: 'expresslibrary',   // Nama database
  password: 'adminmaster',      // Password PostgreSQL
  port: 5432,                   //Port postgreSQL
});

pool.connect((err, client, release) => {
  if (err){
    console.error('Error connecting to the database', err.stack);
  } else {
    console.log('Connected to the database');
  }
  release();
});

module.exports = pool;