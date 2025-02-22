const {
    updateUserById,
    getAllUsers,
    getAnUserById,
    deleteUserById,
    createUser,
    changePassword
} = require("../../controllers/users.controller");
const { checkToken, checkAdmin, verifyToken } = require("../../middlewares/auth.middleware");

const router = require("express").Router();


router.put("/change-password/:id", checkToken, verifyToken, changePassword); // Nueva ruta para cambiar contraseña
router.put("/:userId", checkToken, updateUserById);
router.get("/", checkToken, getAllUsers);

router.get("/:id", checkToken, getAnUserById);
router.delete("/:id", checkToken, deleteUserById);
router.post("/register", checkToken, checkAdmin, createUser);

module.exports = router;
