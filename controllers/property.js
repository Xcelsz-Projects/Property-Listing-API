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
        const {title, location, price, details, image} = req.body;

        const [result] = await pool.query(
            'INSERT INTO properties (title, location, price, details, image) VALUES (?, ?, ?, ?, ?)',
            [title, location, price, details, image]
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

export const updateProperty = async (req, res, next) => {
    const { id } = req.params; // Property ID from the URL
    const updates = req.body; // Fields to update

    try {
        // Generate dynamic SQL query based on the fields provided
        const fields = Object.keys(updates)
            .map((field) => `${field} = ?`)
            .join(', ');
        const values = Object.values(updates);

        // Add the property ID as the last parameter
        values.push(id);

        // Perform the update
        const [result] = await pool.query(
            `UPDATE properties SET ${fields} WHERE id = ?`,
            values
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Property not found or no changes were made.' });
        }

        res.status(200).json({ message: 'Property updated successfully.' });
    } catch (error) {
        next(error);
    }
};


