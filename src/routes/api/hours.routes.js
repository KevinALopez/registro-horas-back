const express = require("express");
const { getAllHoursByMonth, getHoursWorkedByDate, registerWorkdayStart,
    registerWorkdayEnd, registerHoursOnProject } = require("../../controllers/hours.controller");

const router = require("express").Router();


const { checkToken } = require("../../middlewares/auth.middleware");

router.get("/:month", checkToken, getAllHoursByMonth);
router.post("/start", checkToken, registerWorkdayStart);
router.post("/end", checkToken, registerWorkdayEnd);
router.post("/projects", checkToken, registerHoursOnProject);

router.post('/', getHoursWorkedByDate);

module.exports = router;
