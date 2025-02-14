// /api

const router = require("express").Router();

router.use("/auth", require("./api/auth.routes.js"));

module.exports = router;
