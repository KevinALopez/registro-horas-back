const Pause = require("../models/pauses.model");

const insertPause = async (req, res, next) => {
    const user_id = req.user.id;

    try {
        const result = await Pause.insertPause({ ...req.body, user_id });
        res.json({
            message: "Pause started",
            id: result.insertId,
        });
    } catch (error) {
        next(error);
    }
};
const UpdatePause = async (req, res, next) => {
    try {
        const result = await Pause.UpdatePause(req.body);
        res.json({
            message: "Pause end",
        });
    } catch (error) {
        next(error);
    }
};

const getLastIncompletePause = async (req, res, next) => {
    const userId = req.user.id;

    try {
        const result = await Pause.getLastIncompletePause(userId);

        if (result.length === 0) {
            return res
                .status(404)
                .json({ message: "No incomplete pause found." });
        }

        res.json(result[0]);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    insertPause,
    UpdatePause,
    getLastIncompletePause,
};
