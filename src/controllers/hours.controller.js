const customPasrseFormat = require("dayjs/plugin/customParseFormat");
const dayjs = require("dayjs");
dayjs.extend(customPasrseFormat);

const Hours = require("../models/hours.model");

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

module.exports = { registerWorkdayStart };
