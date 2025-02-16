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
const getAllHoursByMonth = async (month) => {
    const currentYear = new Date().getFullYear();
    try {
        const [rows] = await pool.query(
            `SELECT 
                h.id, 
                h.hours, 
                DATE_FORMAT(h.date, '%d-%m-%Y') AS dateTime,
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
            [month, currentYear]
        );

        return rows;
    } catch (error) {
        console.error("🔴 Error en getAllHoursByMonth:", error);
        return [];


    }
};

const getHoursWorkedByDate = async (formattedDate) => {
    try {
        const [rows] = await pool.query(
            `SELECT SUM(hours) AS totalHours FROM hours_on_projects WHERE date = ?`,
            [formattedDate]
        );

        return rows[0]?.totalHours || 0; // Si no hay registros, devuelve 0
    } catch (error) {
        console.error("🔴 Error en getHoursWorkedByDate:", error);
        return { error: "Error al obtener las horas trabajadas por fecha" };
    }
};



module.exports = {
    getAllHoursByMonth, getHoursWorkedByDate
};
