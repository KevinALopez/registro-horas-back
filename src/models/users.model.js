const pool = require("../config/db");

const updateById = async (
    userId,
    { username, email, password, role, contract }
) => {
    const [result] = await pool.query(
        "update users set username = ?, email = ?, password = ?, role = ?, contract = ? where id = ?",
        [username, email, password, role, contract, userId]
    );

    return result;
};
const selectById = async (userId) => {
    const [result] = await pool.query("select * from users where id = ?", [
        userId,
    ]);

    if (result.length === 0) return null;

    return result[0];
};
const selectAll = async() => {
    
        const [result] = await pool.query('select * from users');
        return result;
   
  
}


module.exports = {
    updateById,
    selectById,
    selectAll
};
