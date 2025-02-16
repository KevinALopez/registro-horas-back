// api/hours

const router = require("express").Router();

const {
    getAllHoursByMonth,
    registerWorkdayStart,
} = require("../../controllers/hours.controller");
const { checkToken } = require("../../middlewares/auth.middleware");

router.get("/:month", checkToken, getAllHoursByMonth);
router.post("/start", checkToken, registerWorkdayStart);

module.exports = router;
