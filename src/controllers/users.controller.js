const bcrypt = require("bcryptjs");
const User = require("../models/users.model")

const updateUserById = async (req, res, next) => {
    const { userId } = req.params;

    req.body.password = bcrypt.hashSync(req.body.password, 8) //se hace un hash de la contraseña antes de actualizar

    try {

        await User.updateById(userId, req.body);
        const updatedUser = await User.selectById(userId);//se busca el id del usuario a actualizar llamando a la función selectById
        res.json({ message: 'User update succesfull', updatedUser });
    } catch (error) {
        next(error);
    }
}


const getAnUserById = async (req, res, next) => {
    const { id } = req.params;


    if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
    }

    try {
        const results = await getAnUserById(id)

        if (results.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        // Devolver el usuario encontrado
        res.status(200).json(results[0]);
    } catch (error) {
        next(error)
    }
};

module.exports = {
    updateUserById, getAnUserById
}
