const { updateUserById, getAllUsers } = require('../../controllers/users.controller');
const { checkToken } = require('../../middlewares/auth.middleware');



const router = require('express').Router();

router.put("/:userId", checkToken, updateUserById);
router.get("/", checkToken,getAllUsers)


module.exports = router;