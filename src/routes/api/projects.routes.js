const { deleteProjectById } = require('../../controllers/projects.controller');

const router = require('express').Router();

router.delete('/:id', deleteProjectById)






module.exports = router;