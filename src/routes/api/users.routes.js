const { updateUserById, } = require('../../controllers/users.controller');
const { checkToken } = require('../../middlewares/auth.middleware');
const { getAnUserById } = require('../../models/users.model');



const router = require('express').Router();

router.put("/:userId", checkToken, updateUserById)
router.get("/:id", checkToken, getAnUserById)

module.exports = router;