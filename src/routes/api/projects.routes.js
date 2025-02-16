const { deleteProjectById, updateProjectById } = require('../../controllers/projects.controller');
const { checkToken, checkAdmin } = require('../../middlewares/auth.middleware');


const router = require('express').Router();

router.delete('/:id', deleteProjectById);
router.put("/:id", checkToken, checkAdmin, updateProjectById)



module.exports = router;