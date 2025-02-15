const { updateUserById } = require('../../controllers/users.controller');
const { checkToken } = require('../../middlewares/auth.middleware');



const router = require('express').Router();

router.put("/:userId", checkToken, updateUserById)


module.exports = router;