const { searchUserByUsername } = require("../models/auth.model");

const loginUser = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const user = await searchUserByUsername(username);

        res.json(result);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    loginUser,
};
