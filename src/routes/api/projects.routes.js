const { deleteProjectById } = require("../../controllers/projects.controller");
const { checkToken } = require("../../middlewares/auth.middleware");

const router = require("express").Router();

router.delete("/:id", checkToken, deleteProjectById);

module.exports = router;
