const express = require("express");
var router = express.Router();
const authController = require("../src/controllers/authController");

router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);
router.post("/auth/logout", authController.logout);
router.post("/auth/sendEmail/:email", authController.sendEmail);
router.post("/auth/checkIdDuplicate", authController.checkIdDuplicate);
router.post("/auth/checkEmailDuplicate", authController.checkEmailDuplicate);
router.post("/verify/:userId",authController.userVerify);
router.post("/verifyEmail", authController.emailVerify);

module.exports = router;
