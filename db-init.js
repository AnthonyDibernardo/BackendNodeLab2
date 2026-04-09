const fs = require('fs');
const path = require('path');
const { pool } = require('./db');

const initDatabase = async () => {
    const sqlFilePath = path.join(__dirname, 'init-db.sql');
    const sql = fs.readFileSync(sqlFilePath, 'utf8');

    try {
        const connection = await pool.getConnection();
        await connection.query(sql);
        console.log('Database initialized successfully.');

        connection.release();
    } catch (error) {
        console.error('Error initializing the database:', error);
    }
};

initDatabase();