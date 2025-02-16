const pool = require("../config/db");

/**
 * Registers the start of a workday for a user.
 *
 * @async
 * @function registerWorkdayStart
 * @param {Object} params - The parameters for registering workday start.
 * @param {number} params.userId - The ID of the user.
 * @param {string|Date} params.start - The start time of the workday.
 * @returns {Promise<Object>} The result of the database query.
 */
const registerWorkdayStart = async ({ userId, start }) => {
    const [result] = await pool.query(
        "insert into hours_by_date (userid, start) values (?, ?)",
        [userId, start]
    );

    return result;
};

module.exports = { registerWorkdayStart };
