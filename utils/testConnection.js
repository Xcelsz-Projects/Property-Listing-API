import pool from "./db.js";

const testConnection = async () => {
    try {
      const [rows] = await pool.query('SELECT 1 + 1 AS result');
      console.log('Database connected successfully. Test result:', rows[0].result);
    } catch (error) {
      console.error('Error connecting to the database:', error.message);
    } finally {
      await pool.end(); // Close the connection pool after testing
    }
  };
  
  testConnection();
  