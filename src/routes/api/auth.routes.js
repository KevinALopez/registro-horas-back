// /api/auth

const { loginUser } = require("../../controllers/auth.controller");

const router = require("express").Router();

router.post("/login", loginUser);

module.exports = router;
