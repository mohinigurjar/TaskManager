const express = require("express");
const { createUser, loginUser, logoutUser, getMe } = require("../controllers/auth.controller")
const { validate } = require("../middleware/validator.middleware")
const { signupValidator, loginValidator } = require("../validators/validator.auth")
const { userAuth } = require("../middleware/userAuth.middlleware")
const router = express.Router();

router.post('/signup', validate(signupValidator), createUser);
router.post('/login', validate(loginValidator), loginUser);
router.post('/logout', userAuth, logoutUser); 
router.get('/me', userAuth, getMe);

module.exports = router;