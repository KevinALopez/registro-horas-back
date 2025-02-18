const pool = require("../config/db");

/**
 * Obtiene todas las horas trabajadas en un mes específico del año actual.
 *
 * Esta función consulta la base de datos para recuperar las horas trabajadas en un mes determinado,
 * incluyendo información del usuario y del proyecto asociado.
 *
 * @async
 * @function getAllHoursByMonth
 * @param {number} month - Número del mes a consultar (1-12).
 * @returns {Promise<Object[]>} Un array de objetos con los datos de las horas trabajadas, incluyendo:
 * - `id`: ID del registro de horas.
 * - `hours`: Número de horas trabajadas.
 * - `dateTime`: Fecha formateada en "DD-MM-YYYY".
 * - `userId`: ID del usuario.
 * - `username`: Nombre de usuario.
 * - `contract`: Tipo de contrato del usuario.
 * - `projectId`: ID del proyecto asociado.
 * - `name`: Nombre del proyecto.
 * - `status`: Estado del proyecto.
 * @throws {Error} Si ocurre un error durante la consulta a la base de datos.
 */
const getAllHoursByMonth = async (month, year) => {
    try {
        const [rows] = await pool.query(
            `SELECT 
                h.id, 
                h.hours, 
                DATE_FORMAT(h.date, '%Y-%m-%d') AS dateTime,
                u.id AS userId, 
                u.username, 
                u.contract,
                p.id AS projectId, 
                p.name, 
                p.status
            FROM hours_on_projects h
            JOIN users u ON h.user_id = u.id
            JOIN projects p ON h.project_id = p.id
            WHERE MONTH(h.date) = ? AND YEAR(h.date) = ?`,
            [month, year]
        );

        return rows;
    } catch (error) {
        console.error("🔴 Error en getAllHoursByMonthAndYear:", error);
        return [];
    }
};

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

const registerWorkdayEnd = async ({ id, end }) => {
    const [result] = await pool.query(
        "UPDATE hours_by_date SET end = ? WHERE id = ?",
        [end, id]
    );

    return result;
};

/**
 * Obtiene el total de horas trabajadas por usuario en una fecha específica.
 *
 * Esta función consulta la base de datos para calcular la suma de horas trabajadas en un día determinado.
 * Agrupa los resultados por usuario para evitar nombres duplicados y devuelve un array con el total de horas por usuario.
 *
 * @async
 * @function getHoursWorkedByDate
 * @param {string} formattedDate - Fecha en formato 'YYYY-MM-DD' para consultar las horas trabajadas.
 * @returns {Promise<Object[]|null>} Un array de objetos con las horas trabajadas por usuario o `null` si no hay registros o hay un error.
 * - `{ hours: number, userName: string }`
 * @throws {Error} Si ocurre un error durante la consulta a la base de datos.
 */
const getHoursWorkedByDate = async (formattedDate) => {
    try {
        const [rows] = await pool.query(
            `SELECT
                SUM(h.hours) AS totalHours,
                u.username AS userName
            FROM hours_on_projects h
            JOIN users u ON h.user_id = u.id
            WHERE h.date = ?
            GROUP BY u.id`, // Agrupar por usuario para que no se dupliquen nombres
            [formattedDate]
        );
        if (rows.length === 0) {
            return null; // Si no hay registros, devolver null
        }
        return rows.map((row) => ({
            hours: row.totalHours || 0,
            userName: row.userName,
        }));
    } catch (error) {
        return null; // Devolver null en caso de error
    }
};


const registerHoursOnProject = async ({ hours, date, userId, projectId }) => {

    const [result] = await pool.query(
        'insert into hours_on_projects (hours,date,user_id, project_id) values (?,?,?,?)',
        [hours, date, userId, projectId]
    );
    return result;

}




module.exports = {
    getAllHoursByMonth, getHoursWorkedByDate, registerWorkdayStart, registerWorkdayEnd, registerHoursOnProject
};
