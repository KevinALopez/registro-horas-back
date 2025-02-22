const customPasrseFormat = require("dayjs/plugin/customParseFormat");
const dayjs = require("dayjs");
dayjs.extend(customPasrseFormat);

const User = require("../controllers/users.controller");
const Project = require("../controllers/projects.controller");
const Hours = require("../models/hours.model");

const getFormattedDate = (dateString) => {
    const parts = dateString.split("-");
    if (parts.length !== 3) return null;

    const [year, month, day] = parts;
    return `${year}-${month}-${day}`; //Devuelve en formato YYYY-MM-DD
};

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
    const { month, year } = req.params;
    // Validar que mes y año sean números válidos
    const parsedMonth = Number(month);
    const parsedYear = Number(year);

    if (!Number.isInteger(parsedMonth) || parsedMonth < 1 || parsedMonth > 12) {
        return res.status(400).json({
            message: "Invalid month. Please provide a number between 1 and 12.",
        });
    }

    if (
        !Number.isInteger(parsedYear) ||
        parsedYear < 2000 ||
        parsedYear > 2100
    ) {
        return res.status(400).json({
            message: "Invalid year. Please provide a valid year (2000-2100).",
        });
    }

    try {
        const hours = await Hours.getAllHoursByMonth(parsedMonth, parsedYear);

        if (!Array.isArray(hours) || hours.length === 0) {
            return res.status(404).json({
                message: "No hours found for the selected month and year.",
            });
        }

        // Formatear la respuesta antes de enviarla
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
        console.error("❌ Error en getAllHoursByMonthAndYear:", error);
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

const registerWorkdayEnd = async (req, res, next) => {
    const { id, end } = req.body;

    if (!dayjs(end, "YYYY-MM-DD HH:mm:ss", true).isValid()) {
        return res.status(400).json({ message: `${end} is an invalid date.` });
    }

    try {
        const { affectedRows } = await Hours.registerWorkdayEnd({
            id,
            end,
        });

        if (affectedRows === 0) {
            return res
                .status(404)
                .json({ message: `There is no entry with the id ${id}. ` });
        }

        res.json({
            message: "Workday end registered successfully",
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Obtiene el total de horas trabajadas por usuario en una fecha específica.
 *
 * Esta función recibe una fecha desde el cuerpo de la solicitud (`req.body.date`),
 * la valida y la convierte al formato `YYYY-MM-DD`. Luego consulta la base de datos
 * para recuperar las horas trabajadas en esa fecha, agrupadas por usuario.
 *
 * @async
 * @function getHoursWorkedByDate
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} req.body - Datos enviados en la solicitud.
 * @param {string} req.body.date - Fecha a consultar en formato `YYYY-MM-DD`.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} Devuelve una respuesta JSON con los datos de horas trabajadas o un mensaje de error.
 * @throws {Error} Si ocurre un error durante la consulta a la base de datos.
 */
const getHoursWorkedByDate = async (req, res) => {
    const { date } = req.body;
    // Verificar si se recibió una fecha
    if (!date) {
        return res.status(400).json({ message: "Date is required." });
    }
    // Convertir la fecha al formato MySQL (YYYY-MM-DD)
    const formattedDate = getFormattedDate(date);
    // Validar que la conversión fue exitosa
    if (!formattedDate) {
        return res
            .status(400)
            .json({ message: "Invalid date format. Use DD-MM-YYYY." });
    }
    try {
        // Obtener datos desde el modelo
        const workData = await Hours.getHoursWorkedByDate(formattedDate);

        if (!workData || workData.length === 0) {
            return res
                .status(404)
                .json({ message: "No hours found for the selected date." });
        }
        res.status(200).json({ data: workData });
    } catch (error) {
        console.error("❌ Error en getHoursWorkedByDate:", error);
        res.status(500).json({
            message: "Server error, please try again later.",
        });
    }
};

const registerHoursOnProject = async (req, res, next) => {
    const { date, projectId, userId } = req.body;

    if (!dayjs(date, "YYYY-MM-DD", true).isValid()) {
        return res.status(400).json({ message: `${date} is an invalid date.` });
    }

    try {
        const userExists = await User.userExists(userId);
        const projectExists = await Project.projectExists(projectId);

        if (userExists) {
            return res
                .status(404)
                .json({ message: `User with id ${userId} does not exist.` });
        }

        if (projectExists) {
            return res.status(404).json({
                message: `Project with id ${projectId} does not exist.`,
            });
        }

        const result = await Hours.registerHoursOnProject(req.body);
        res.json({ message: "Hours assigned successfully" });
    } catch (error) {
        next(error);
    }
};

const getLastIncompleteShift = async (req, res, next) => {
    const userId = req.user.id;

    try {
        const result = await Hours.getLastIncompleteShift(userId);

        if (result.length === 0) {
            return res
                .status(404)
                .json({ message: "No incomplete shifts found." });
        }

        res.json(result[0]);
    } catch (error) {
        next(error);
    }
};

const getUnassignedHours = async (req, res, next) => {
    const userId = req.user.id;

    try {
        const workedTime = await Hours.getTotalWorkedTime(userId);
        const assignedHours = await Hours.getAssignedHours(userId);

        if (workedTime.length === 0 || assignedHours.length === 0) {
            return res.status(404).json({ message: "No hours found." });
        }

        workedTime[0].hours = (
            Number(workedTime[0].hours) +
            Number(parseInt(workedTime[0].minutes) / 60)
        ).toFixed(2);

        const totalWorkedTime = convertToHoursAndMinutes(workedTime[0].hours);
        const totalAssignedHours = convertToHoursAndMinutes(
            assignedHours[0].hours
        );

        const unassignedHours =
            totalWorkedTime.hours - totalAssignedHours.hours;
        const unassignedMinutes = Math.abs(
            Math.round(totalWorkedTime.minutes - totalAssignedHours.minutes)
        );

        res.json({
            hours: unassignedHours,
            minutes: unassignedMinutes,
        });
    } catch (error) {
        next(error);
    }
};

const convertToHoursAndMinutes = (decimalHours) => {
    const hours = Math.floor(decimalHours);
    const minutes = (decimalHours - hours) * 60;
    return { hours, minutes };
};

module.exports = {
    getAllHoursByMonth,
    getHoursWorkedByDate,
    registerWorkdayStart,
    registerWorkdayEnd,
    registerHoursOnProject,
    getLastIncompleteShift,
    getUnassignedHours,
};
