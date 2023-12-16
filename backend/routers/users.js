var express = require('express');
const userController = require("../src/controllers/userController");
const authController = require("../src/controllers/authController");
var router = express.Router();

router.get('/users', userController.getUserList);
router.delete('/users/:id', userController.deleteUser);
router.post("/user/password", userController.changePassword);

module.exports = router;