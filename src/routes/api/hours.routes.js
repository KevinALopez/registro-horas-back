const express = require("express");
const { getAllHoursByMonth, getHoursWorkedByDate } = require("../../controllers/hours.controller");

const router = require("express").Router();

const {
    getAllHoursByMonth,
    registerWorkdayStart,
    registerWorkdayEnd,
} = require("../../controllers/hours.controller");

const { checkToken } = require("../../middlewares/auth.middleware");

router.get("/:month", checkToken, getAllHoursByMonth);
router.post("/start", checkToken, registerWorkdayStart);
router.post("/end", checkToken, registerWorkdayEnd);

router.post('/', getHoursWorkedByDate);

module.exports = router;
