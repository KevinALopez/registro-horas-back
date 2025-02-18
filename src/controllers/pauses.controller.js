const Pause = require("../models/pauses.model");

const insertPause = async (req, res, next) => {
    const user_id = req.user.id;

    try {
        const result = await Pause.insertPause({ ...req.body, user_id });
        res.json({
            message: "Pause start registrada correctamente",
            id: result.insertId,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    insertPause,
};
