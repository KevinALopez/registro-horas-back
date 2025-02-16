const pool = require("../config/db");

/**
 * Elimina un proyecto de la base de datos por su ID.
 * 
 * Esta función primero verifica si el proyecto con el ID proporcionado existe en la base de datos.
 * Si el proyecto se encuentra, procede a eliminarlo. Si no existe, devuelve un objeto con `affectedRows: 0`.
 * 
 * @async
 * @function deleteProjectById
 * @param {number} id - Identificador único del proyecto a eliminar.
 * @returns {Promise<Object>} Devuelve un objeto con la propiedad `affectedRows` indicando si se eliminó el proyecto.
 * - `{ affectedRows: 0 }` si el proyecto no existe.
 * - `{ affectedRows: 1 }` si el proyecto fue eliminado con éxito.
 * @throws {Error} Si ocurre un error durante la ejecución de la consulta SQL.
 */


const updateById = async (id, { name, description, start, end, status, estimated_hours, worked_hours }) => {

    const [result] = await pool.query(
        'update projects set name = ?, description = ?, start = ?, end = ?, status = ?,estimated_hours = ?,worked_hours = ? where id = ?',
        [name, description, start, end, status, estimated_hours, worked_hours, id]
    );
    return result;

};

const selectById = async (id) => {
    const [result] = await pool.query('select * from projects where id = ?', [id]);
    if (result.length === 0) return null;
    return result[0];
}


const deleteProjectById = async (id) => {
    try {
        // Verificar si el proyecto existe antes de eliminarlo
        const [rows] = await pool.query("SELECT * FROM projects WHERE id = ?", [id]);

        if (rows.length === 0) {
            return { affectedRows: 0 }; // No encontrado
        }

        // Eliminar el proyecto
        const [result] = await pool.query("DELETE FROM projects WHERE id = ?", [id]);
        return result;
    } catch (error) {
        console.error("Error en deleteProjectById:", error);
        throw error;
    }
};

module.exports = {
    deleteProjectById, updateById, selectById
};
