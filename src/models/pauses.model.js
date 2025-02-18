const pool = require("../config/db");

const insertPause = async ({ user_id, start, type }) => {
    const [result] = await pool.query(
        "insert into pause (user_id, start, type) values (?, ?,?)",
        [user_id, start, type]
    );
    return result;
};

const UpdatePause = async ({ id, end}) => {
    const [result] = await pool.query(
        'UPDATE pause SET end = ? WHERE id = ?',
        [end, id]
    );
    return result;
}

module.exports = {
    insertPause,
    UpdatePause
}
;
