// /api

const router = require("express").Router();

router.use("/auth", require("./api/auth.routes.js"));
router.use("/projects", require("./api/projects.routes.js"));
router.use("/users", require("./api/users.routes.js"));
router.use("/hours", require("./api/hours.routes.js"));


module.exports = router;
