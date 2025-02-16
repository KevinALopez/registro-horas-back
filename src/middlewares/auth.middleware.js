const jwt = require("jsonwebtoken");
const User = require("../models/users.model")

require("dotenv").config();

const checkToken = async (req, res, next) => {
    if (!req.headers["authorization"]) {
        return res
            .status(401)
            .json({ message: "Authorization header is required." });
    }

    const token = req.headers["authorization"];

    let payload = null;

    console.log(token);

    try {
        payload = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return res.status(401).json({ message: "Token is not valid." });
    }

    console.log(payload);

    // TODO: Check if user is valid and add it to the request;
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
