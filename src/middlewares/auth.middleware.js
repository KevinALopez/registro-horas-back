const jwt = require("jsonwebtoken");
<<<<<<< HEAD
const User = require("../models/users.model");
=======
const User = require("../models/users.model")
>>>>>>> feature_updateProjectById

require("dotenv").config();

const checkToken = async (req, res, next) => {
    if (!req.headers["authorization"]) {
        return res
            .status(401)
            .json({ message: "Authorization header is required." });
    }

    const token = req.headers["authorization"];

    let payload = null;

    try {
        payload = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return res.status(401).json({ message: "Token is not valid." });
    }

    // payload = { id: user.id, role: user.role , iat}

    const user = await User.selectById(payload.id);

    if (!user) {
        return res.status(401).json({ message: "User is not valid." });
    }

    req.user = user;

    next();
};

const checkAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'No eres usuario ADMIN' })
    }

    next();
}


module.exports = {
    checkToken, checkAdmin
};
