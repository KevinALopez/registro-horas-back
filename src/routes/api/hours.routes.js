
const router = require("express").Router();

const express = require("express");
const { getAllHoursByMonth, getHoursWorkedByDate, registerWorkdayStart,
    registerWorkdayEnd, registerHoursOnProject } = require("../../controllers/hours.controller");


const { checkToken } = require("../../middlewares/auth.middleware");

router.get("/:month/:year", checkToken, getAllHoursByMonth);
router.post("/start", checkToken, registerWorkdayStart);
router.post("/end", checkToken, registerWorkdayEnd);
router.post("/projects", checkToken, registerHoursOnProject);

router.post("/", getHoursWorkedByDate);
router.post('/', checkToken, getHoursWorkedByDate);

module.exports = router;
