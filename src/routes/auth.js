const express = require("express");
const router = express.Router();
authControllers = require("../controllers/authControllers");
const auth = require("../middlewares/authMid");

router.post("/register", authControllers.register);
router.post("/login", authControllers.login);

module.exports = router;
