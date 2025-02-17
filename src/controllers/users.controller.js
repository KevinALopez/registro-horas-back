const bcrypt = require("bcryptjs");
const User = require("../models/users.model");

const updateUserById = async (req, res, next) => {
    const { userId } = req.params;

    req.body.password = bcrypt.hashSync(req.body.password, 8); //se hace un hash de la contraseña antes de actualizar

    try {
        await User.updateById(userId, req.body);
        const updatedUser = await User.selectById(userId); //se busca el id del usuario a actualizar llamando a la función selectById
        res.json({ message: "User update succesfull", updatedUser });
    } catch (error) {
        next(error);
    }
};
const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.selectAll();
        //res.status(200).json({ message: 'GET usuarios' });
        res.json(users);
    } catch (error) {
        console.error("Error obteniendo usuarios:", error); // Mostrar errores en la consola
        res.status(500).json({
            error: "Server error, please try again later.",
        });
    }
};

const getAnUserById = async (req, res, next) => {
    const { id } = req.params;

    if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
    }

    try {
        const results = await User.getAnUserById(id);

        if (results.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        // Devolver el usuario encontrado
        res.status(200).json(results[0]);
    } catch (error) {
        next(error);
    }
};

const createUser = async (req, res, next) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);

    req.body.password = hashedPassword;

    try {
        const { insertId } = await User.createNewUser(req.body);

        res.json({
            message: "User created successfully",
            id: insertId,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Maneja la eliminación de un usuario por su ID desde una solicitud HTTP.
 *
 * Esta función recibe el ID del usuario desde los parámetros de la URL, valida que sea un número válido
 * y llama a `User.deleteUserById(userId)` para eliminarlo de la base de datos.
 * Devuelve una respuesta JSON indicando el resultado de la operación.
 *
 * @async
 * @function deleteUserById
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} req.params - Parámetros de la URL.
 * @param {string} req.params.id - ID del usuario a eliminar.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} Envía una respuesta JSON con el resultado de la eliminación.
 * @throws {Error} Si ocurre un error durante la consulta a la base de datos.
 */
const deleteUserById = async (req, res) => {
    const { id } = req.params;
    // Validar que el ID es un número válido
    const userId = parseInt(id, 10);
    if (isNaN(userId) || userId <= 0) {
        return res.status(400).json({ message: "Invalid user ID." });
    }

    try {
        const result = await User.deleteUserById(userId);

        if (result.error) {
            return res.status(404).json({ message: result.error });
        }
        res.status(200).json({ message: result.message });
    } catch (error) {
        res.status(500).json({
            message: "Server error, please try again later.",
        });
    }
};

module.exports = {
    updateUserById,
    getAnUserById,
    getAllUsers,
    createUser,
    deleteUserById,
};
