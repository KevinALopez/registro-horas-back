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
const UpdatePause = async (req, res,next) => {
    try {
        const result = await Pause.UpdatePause(req.body);
        res.json({
            message: "Pause end",
            
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    insertPause,
    UpdatePause
}

