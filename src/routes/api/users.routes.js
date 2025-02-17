const {
    updateUserById,
    getAllUsers,
    getAnUserById,
    createUser,
} = require("../../controllers/users.controller");
const { checkToken, checkAdmin } = require("../../middlewares/auth.middleware");

const router = require("express").Router();

router.put("/:userId", checkToken, updateUserById);
router.get("/", checkToken, getAllUsers);
router.get("/:id", checkToken, getAnUserById);
router.post("/register", checkToken, checkAdmin, createUser);

module.exports = router;
