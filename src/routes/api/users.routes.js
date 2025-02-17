const { updateUserById, getAllUsers, getAnUserById } = require('../../controllers/users.controller');
const { checkToken } = require('../../middlewares/auth.middleware');






const router = require('express').Router();

router.put("/:userId", checkToken, updateUserById);
router.get("/", checkToken, getAllUsers)
router.get("/:id", checkToken, getAnUserById)

module.exports = router;