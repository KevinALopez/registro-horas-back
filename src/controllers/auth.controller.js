const bcrypt = require("bcryptjs");
const auth = require("../models/auth.model");


/**
 * Authenticates a user and generates a JWT token if credentials are valid.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.body - The request body containing login credentials.
 * @param {string} req.body.username - The username of the user.
 * @param {string} req.body.password - The password of the user.
 * @param {Object} res - The response object used to send back the result.
 * @param {Function} next - The next middleware function to handle errors.
 * @returns {Promise<void>} Sends a JSON response with a success message and JWT token if login is successful,
 * or an error message if authentication fails.
 */
const loginUser = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const result = await auth.searchUserByUsername(username);

        if (result.length === 0) {
            return res
                .status(401)
                .json({ message: "Wrong username or password." });
        }

        const passwordMatch = bcrypt.compareSync(password, result[0].password);

        if (!passwordMatch) {
            return res
                .status(401)
                .json({ message: "Wrong username or password." });
        }

        const token = auth.generateToken(result[0]);

        res.json({
            message: "Login successful.",
            token,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    loginUser
};
