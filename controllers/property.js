import pool from "../utils/db.js";
// import mysql from 'mysql2/promise';

// const pool = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.DB_NAME,
//     port: process.env.DB_PORT || 46064,
// });

// POST create new property
export const createProperty = async (req, res, next) => {
    try {
        const {title, location, price, image} = req.body;

        const [result] = await pool.query(
            'INSERT INTO properties (title, location, price, image) VALUES (?, ?, ?, ?)',
            [title, location, price, image]
        );

        res.status(201).json({
            message: 'Property created', 
            id: result.insertId
        });
    } catch (error) {
        next(error);
    }
} 


// Get all properties
export const getAllProperties = async (req, res, next) => {
    try {
        const [rows] = await pool.query('SELECT * FROM properties');

        res.status(200).json(rows);
    } catch (error) {
        next(error);
    }
}


// Get property by ID
export const getPropertyById = async (req, res, next) => {
    try {
        const {id} = req.params;
        const [rows] = await pool.query('SELECT * FROM properties WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({message: 'Property not found'});
        }

        res.status(200).json(rows[0]);
    } catch (error) {
        next(error)
    }
}

