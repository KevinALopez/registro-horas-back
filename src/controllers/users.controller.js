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
const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.selectAll();
        //res.status(200).json({ message: 'GET usuarios' });
        res.json(users);
    } catch (error) {
        console.error('Error obteniendo usuarios:', error); // Mostrar errores en la consola
        res.status(500).json({ error: 'Server error, please try again later.' });
    }
   
}
module.exports = {
    updateUserById,
    getAllUsers
}
