const customPasrseFormat = require("dayjs/plugin/customParseFormat");
const dayjs = require("dayjs");
dayjs.extend(customPasrseFormat);

const Hours = require("../models/hours.model");

/**
 * Obtiene todas las horas trabajadas en un mes específico.
 *
 * Esta función recibe un mes como parámetro en la URL, valida que sea un número entre 1 y 12,
 * y consulta la base de datos para obtener todas las horas trabajadas en ese mes.
 * Si encuentra datos, los formatea y devuelve una respuesta JSON estructurada.
 *
 * @async
 * @function getAllHoursByMonth
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} req.params - Parámetros de la URL.
 * @param {string} req.params.month - Número del mes a consultar (1-12).
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} Devuelve una respuesta JSON con las horas trabajadas o un mensaje de error.
 * @throws {Error} Si ocurre un error durante la consulta a la base de datos.
 */
const getAllHoursByMonth = async (req, res) => {
    const { month } = req.params;
    // Validar que el mes sea un número válido (1-12)
    const parsedMonth = parseInt(month, 10);
    if (isNaN(parsedMonth) || parsedMonth < 1 || parsedMonth > 12) {
        return res.status(400).json({
            message: "Invalid month. Please provide a number between 1 and 12.",
        });
    }
    try {
        const hours = await Hours.getAllHoursByMonth(parsedMonth);
        // Validar si `hours` es null, undefined o un array vacío
        if (!Array.isArray(hours) || hours.length === 0) {
            return res
                .status(404)
                .json({ message: "No hours found for the selected month." });
        }
        const formattedData = hours.map((row) => ({
            id: row.id,
            hours: row.hours,
            dateTime: row.dateTime,
            user: {
                userId: row.userId,
                username: row.username,
                contract: row.contract,
            },
            project: {
                projectId: row.projectId,
                name: row.name,
                status: row.status,
            },
        }));

        res.status(200).json({ data: formattedData });
    } catch (error) {
        res.status(500).json({
            message: "Server error, please try again later.",
        });
    }
};

/**
 * Registers the start of a workday for a user and responds to the client.
 *
 * @async
 * @function registerWorkdayStart
 * @param {import("express").Request} req - The Express request object.
 * @param {import("express").Response} res - The Express response object.
 * @param {import("express").NextFunction} next - The Express next function for error handling.
 * @returns {Promise<void>} A promise that resolves when the response is sent.
 */
const registerWorkdayStart = async (req, res, next) => {
    const userId = req.user.id;
    const { start } = req.body;

    if (!dayjs(start, "YYYY-MM-DD HH:mm:ss", true).isValid()) {
        return res
            .status(400)
            .json({ message: `${start} is an invalid date.` });
    }

    try {
        const { insertId } = await Hours.registerWorkdayStart({
            userId,
            start,
        });

        res.json({
            message: "Workday start registered successfully",
            id: insertId,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { registerWorkdayStart, getAllHoursByMonth };
