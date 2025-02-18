
const router = require("express").Router();
const {
    getAllHoursByMonth,
    registerWorkdayStart,
    registerWorkdayEnd,
    getHoursWorkedByDate,
    registerHoursOnProject
} = require("../../controllers/hours.controller");
const {
    insertPause,
    UpdatePause
} = require("../../controllers/pauses.controller");
const { checkToken } = require("../../middlewares/auth.middleware");

router.get("/:month/:year", checkToken, getAllHoursByMonth);
router.post("/start", checkToken, registerWorkdayStart);
router.post("/end", checkToken, registerWorkdayEnd);
router.post("/projects", checkToken, registerHoursOnProject);

router.post("/pause/start",checkToken, insertPause);
router.patch("/pause/end",checkToken, UpdatePause);

router.post("/", getHoursWorkedByDate);
router.post('/', checkToken, getHoursWorkedByDate);

module.exports = router;
