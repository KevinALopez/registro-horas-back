const pool = require("../config/db");


const insertPause = async ({ user_id, start}) => {
    const [result] = await pool.query(
        'insert into pause (user_id, start) values (?, ?)',
        [user_id, start]
    );
    return result;
}

module.exports = {
    insertPause
}