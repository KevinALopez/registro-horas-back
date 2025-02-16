// api/hours

const { registerWorkdayStart } = require("../../controllers/hours.controller");
const { checkToken } = require("../../middlewares/auth.middleware");

const router = require("express").Router();

router.post("/start", checkToken, registerWorkdayStart);

module.exports = router;
