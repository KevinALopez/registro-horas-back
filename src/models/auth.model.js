const db = require("../config/db.js");
const bcrypt = require("bcryptjs");

const searchUserByUsername = async (username) => {
    try {
        const [result] = await db.query(
            "SELECT * FROM users WHERE username = ?",
            [username]
        );

        return result;
    } catch (error) {
        console.log(error);
        return [];
    }
};

module.exports = {
    searchUserByUsername,
};
