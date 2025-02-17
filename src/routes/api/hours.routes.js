
const router = require("express").Router();

const {
    getHoursWorkedByDate,
    getAllHoursByMonth,
    registerWorkdayStart,
    registerWorkdayEnd,
    getHoursWorkedByDate,
} = require("../../controllers/hours.controller");

const { checkToken } = require("../../middlewares/auth.middleware");

router.get("/:month", checkToken, getAllHoursByMonth);
router.post("/start", checkToken, registerWorkdayStart);
router.post("/end", checkToken, registerWorkdayEnd);

router.post('/', getHoursWorkedByDate);

module.exports = router;
