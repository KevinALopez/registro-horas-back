const db = require("../config/db.js");
const jwt = require("jsonwebtoken");

/**
 * Searches for a user in the database by their username.
 *
 * @param {string} username - The username of the user to search for.
 * @returns {Promise<Array>} A promise that resolves to an array containing the user data if found, or an empty array if no user is found.
 */
const searchUserByUsername = async (username) => {
    const [result] = await db.query("SELECT * FROM users WHERE username = ?", [
        username,
    ]);

    return result;
};

/**
 * Generates a JSON Web Token (JWT) for a user.
 *
 * @param {Object} user - The user object containing user details.
 * @param {number} user.id - The unique ID of the user.
 * @param {string} user.role - The role of the user.
 * @returns {string} A signed JWT token.
 */
const generateToken = (user) => {
    const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET
    );

    return token;
};

module.exports = {
    searchUserByUsername,
    generateToken,
};
