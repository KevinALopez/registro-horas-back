const {
    deleteProjectById,
    updateProjectById,
    getAllProjects,
} = require("../../controllers/projects.controller");
const { checkToken, checkAdmin } = require("../../middlewares/auth.middleware");

const router = require("express").Router();

router.delete("/:id", checkToken, deleteProjectById);
router.put("/:id", checkToken, checkAdmin, updateProjectById);
router.get("", checkToken, getAllProjects);

module.exports = router;
