import express from 'express';
import cors from 'cors';
// import helmet from 'helmet';
import pool from './utils/db.js';
import propertyRouter from './routes/property.js';

const app = express();



app.use(cors());
app.use(express.json());

app.use('/api', propertyRouter);

app.get('/test-db', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT 1 + 1 AS result');
        
        res.send(`Database connected: ${rows[0].result}`);
    } catch (err) {
        res.status(500).send(`Error: ${err.message}`);
    }
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

console.log(process.env.DB_HOST)
