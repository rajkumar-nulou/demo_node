
const express = require('express');
const router = express.Router();

const Database = require('./db');

const db = new Database();

// Success response handler
const successResponse = (res, message, data = null) => {
    res.status(200).json({
        statuscode: 200,
        error: false,
        message,
        data,
    });
};

// Error response handler
const errorResponse = (res, statusCode, message) => {
    res.status(statusCode).json({
        statuscode: statusCode,
        error: true,
        message,
    });
};

// Function to execute SQL query
async function executeQuery(sql, params) {
    try {
        const result = await db.query(sql, params);

        if (!result) throw new Error("No result from database query");

        return result;
    } catch (err) {
        console.log("Error executing query", err);
        throw new Error(`Error executing query: ${err.message}`);
    }
}

// Function to fetch all users
function getAllUsers() {
    const sql = `SELECT * FROM users`;
    const params = [];

    return executeQuery(sql, params);
}

// Controller to handle Get All Users request
async function GetAllUsers(req, res) {
    try {
        const users = await getAllUsers();
        successResponse(res, "User Details Fetched Successfully", users);
    } catch (error) {
        console.log(error);
        return errorResponse(res, 500, "Internal server error");
    }
}

// Route to get all users
router.get("/get-all-users", GetAllUsers);

module.exports = router;
