<<<<<<< HEAD
const { deleteProjectById } = require("../../controllers/projects.controller");
const { checkToken } = require("../../middlewares/auth.middleware");
=======
const { deleteProjectById, updateProjectById } = require('../../controllers/projects.controller');
const { checkToken, checkAdmin } = require('../../middlewares/auth.middleware');

>>>>>>> feature_updateProjectById

const router = require("express").Router();

<<<<<<< HEAD
router.delete("/:id", checkToken, deleteProjectById);

module.exports = router;
=======
router.delete('/:id', deleteProjectById);
router.put("/:id", checkToken, checkAdmin, updateProjectById)



module.exports = router;
>>>>>>> feature_updateProjectById
