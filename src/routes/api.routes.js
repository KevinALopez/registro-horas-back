// /api

const router = require("express").Router();

router.use("/auth", require("./api/auth.routes.js"));
router.use("/projects", require("./api/projects.routes.js"));

module.exports = router;
