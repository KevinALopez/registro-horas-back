const express = require("express");
const { getAllHoursByMonth, getHoursWorkedByDate } = require("../../controllers/hours.controller");

const router = express.Router();

router.get("/:month", getAllHoursByMonth);

router.post('/', getHoursWorkedByDate);

module.exports = router;
