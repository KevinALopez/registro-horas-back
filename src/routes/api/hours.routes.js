const express = require("express");
const { getAllHoursByMonth } = require("../../controllers/hours.controller");

const router = express.Router();

router.get("/:month", getAllHoursByMonth);

module.exports = router;
