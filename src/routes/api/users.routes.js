const {
    updateUserById,
    getAllUsers,
    getAnUserById,
    deleteUserById,
    createUser,
} = require("../../controllers/users.controller");
const { checkToken, checkAdmin } = require("../../middlewares/auth.middleware");

const router = require("express").Router();

router.put("/:userId", checkToken, updateUserById);
router.get("/", checkToken, getAllUsers);
router.get("/:id", checkToken, getAnUserById);
router.delete("/:id", checkToken, deleteUserById);
router.post("/register", checkToken, checkAdmin, createUser);

module.exports = router;
