const express = require("express");
const { createUser, loginUser, logoutUser } = require("../controllers/auth.controller")
const { validate } = require("../middleware/validator.middleware")
const { signupValidator, loginValidator } = require("../validators/validator.auth")
const router = express.Router();

router.post('/signup', validate(signupValidator), createUser);
router.post('/login', validate(loginValidator), loginUser);
router.post('/logout', logoutUser); //add auth later

module.exports = router;