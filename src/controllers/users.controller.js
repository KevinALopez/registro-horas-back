const bcrypt = require("bcryptjs");
const User = require("../models/users.model");


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
const userExists = async (id) => {

    //función que permite comprobar que un usuarioExiste en la BBDD

    try {
        const user = await User.selectById(id);

        if (!user) return true

        return false;
    } catch (error) {
        next(error);
    }
}
module.exports = {
    updateUserById, userExists
}
