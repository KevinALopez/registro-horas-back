const {
    deleteProjectById,
    updateProjectById,
    getAllProjects,

} = require("../../controllers/projects.controller");
const { checkToken, checkAdmin } = require("../../middlewares/auth.middleware");
const { createNewProject } = require("../../models/projects.model");

const router = require("express").Router();

router.delete("/:id", checkToken, deleteProjectById);
router.put("/:id", checkToken, checkAdmin, updateProjectById);
router.get("", checkToken, getAllProjects);
router.post("", checkToken, checkAdmin, createNewProject)

module.exports = router;
