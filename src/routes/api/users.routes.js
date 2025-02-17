const { updateUserById, getAllUsers, getAnUserById, deleteUserById } = require('../../controllers/users.controller');
const { checkToken } = require('../../middlewares/auth.middleware');






const router = require('express').Router();

router.put("/:userId", checkToken, updateUserById);
router.get("/", checkToken, getAllUsers)
router.get("/:id", checkToken, getAnUserById)
router.delete("/:id", checkToken, deleteUserById);

module.exports = router;