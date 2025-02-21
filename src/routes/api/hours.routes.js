const router = require("express").Router();
const {
    getAllHoursByMonth,
    registerWorkdayStart,
    registerWorkdayEnd,
    getHoursWorkedByDate,
    registerHoursOnProject,
    getLastIncompleteShift,
} = require("../../controllers/hours.controller");
const {
    insertPause,
    UpdatePause,
} = require("../../controllers/pauses.controller");
const { checkToken } = require("../../middlewares/auth.middleware");

router.get("/shift/incomplete", checkToken, getLastIncompleteShift);
router.get("/:month/:year", checkToken, getAllHoursByMonth);

router.post("/start", checkToken, registerWorkdayStart);
router.post("/end", checkToken, registerWorkdayEnd);
router.post("/projects", checkToken, registerHoursOnProject);
router.post("/pause/start", checkToken, insertPause);
router.post("/", checkToken, getHoursWorkedByDate);

router.patch("/pause/end", checkToken, UpdatePause);

module.exports = router;
