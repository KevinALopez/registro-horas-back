const HoursModel = require("../models/hours.model");
const moment = require("moment");

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
        return res.status(400).json({ message: "Invalid month. Please provide a number between 1 and 12." });
    }
    try {
        const hours = await HoursModel.getAllHoursByMonth(parsedMonth);
        // Validar si `hours` es null, undefined o un array vacío
        if (!Array.isArray(hours) || hours.length === 0) {
            return res.status(404).json({ message: "No hours found for the selected month." });
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

        res.status(500).json({ message: "Server error, please try again later." });
    }
};


const getHoursWorkedByDate = async (req, res) => {
    const { date } = req.body;

    console.log(`📥 Recibida solicitud POST /api/hours con fecha: ${date}`);

    // Validar que la fecha esté presente
    if (!date) {
        console.warn("❌ Error: No se envió una fecha.");
        return res.status(400).json({ message: "Date is required." });
    }

    // Validar formato de fecha (DD-MM-YYYY)
    if (!moment(date, "DD-MM-YYYY", true).isValid()) {
        console.warn("❌ Error: Formato de fecha inválido.");
        return res.status(400).json({ message: "Invalid date format. Use DD-MM-YYYY." });
    }

    // Convertir al formato compatible con MySQL (YYYY-MM-DD)
    const formattedDate = moment(date, "DD-MM-YYYY").format("YYYY-MM-DD");

    try {
        const totalHours = await HoursModel.getHoursWorkedByDate(formattedDate);

        console.log(`✅ Horas trabajadas el ${date}: ${totalHours}`);

        res.status(200).json({ hours: totalHours });

    } catch (error) {
        console.error("❌ Error en getHoursWorkedByDate:", error);
        res.status(500).json({ message: "Server error, please try again later." });
    }
};


module.exports = {
    getAllHoursByMonth, getHoursWorkedByDate
};
