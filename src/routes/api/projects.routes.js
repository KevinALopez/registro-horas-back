const { deleteProjectById, updateProjectById, createNewProject } = require('../../controllers/projects.controller');
const { checkToken, checkAdmin } = require('../../middlewares/auth.middleware');


const router = require("express").Router();

router.delete("/:id", checkToken, deleteProjectById);
router.put("/:id", checkToken, checkAdmin, updateProjectById)
router.post("", checkToken, checkAdmin, createNewProject)
module.exports = router;
