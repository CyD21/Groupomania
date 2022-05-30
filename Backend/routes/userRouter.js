const userController = require("../controllers/userController.js");

const router = require("express").Router();

router.post("/add", userController.addUser);

router.post("/login", userController.login);

router.get("/profile", userController.getAllProfile);
router.get("/profile/:id", userController.userProfile);
router.put("/profile/:id", userController.updateProfile);
router.delete("/profile/:id", userController.deleteProfile);

module.exports = router;
