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

const selectAll = async () => {
    const [result] = await pool.query("select * from users");
    return result;
};

const getAnUserById = async (id) => {
    const query =
        "SELECT id, username, email, role, contract FROM users WHERE id = ?";
    const [results] = await pool.query(query, [id]);
    return results;
};

const createNewUser = async ({ username, email, password, role, contract }) => {
    const [result] = await pool.query(
        "insert into users (username, email, password, role, contract) values (?, ?, ?, ?, ?)",
        [username, email, password, role, contract]
    );

    return result;
};

/**
 * Elimina un usuario de la base de datos por su ID.
 *
 * Esta función busca un usuario en la base de datos utilizando su ID y lo elimina si existe.
 * Si el usuario no se encuentra, devuelve un mensaje de error.
 *
 * @async
 * @function deleteUserById
 * @param {number} userId - Identificador único del usuario a eliminar.
 * @returns {Promise<Object>} Un objeto con el resultado de la operación.
 * - `{ message: "User has been deleted." }` si el usuario fue eliminado con éxito.
 * - `{ error: "User not found" }` si no se encontró el usuario en la base de datos.
 * @throws {Error} Si ocurre un error durante la consulta SQL.
 */
const deleteUserById = async (userId) => {
    try {
        const [result] = await pool.query(`DELETE FROM users WHERE id = ?`, [
            userId,
        ]);

        if (result.affectedRows === 0) {
            return { error: "User not found" };
        }

        return { message: "User has been deleted." };
    } catch (error) {
        console.error("🔴 Error en deleteUserById:", error);
        throw new Error("An error occurred while updating the password.");
    }
};


const updatePassword = async (userId, hashedPassword) => {
    try {
        const [result] = await pool.query(
            "UPDATE users SET password = ? WHERE id = ?",
            [hashedPassword, userId]
        );
        return result;
    } catch (error) {
        return { error: "An error occurred while updating the password." };
    }
};





module.exports = {
    updateById,
    selectById,
    selectAll,
    getAnUserById,
    deleteUserById,
    createNewUser,
    updatePassword,
};
