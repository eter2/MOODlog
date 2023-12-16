var express = require("express");
const profileController = require("../src/controllers/profileController");
var router = express.Router();

router.get("/profile/:userId", profileController.getProfileByUserId);
router.get("/profiles", profileController.getAllProfile);
router.post("/profile", profileController.createProfile);
router.put("/profile", profileController.updateProfile);
router.delete("/profile/:userId", profileController.deleteProfile);

module.exports = router;
