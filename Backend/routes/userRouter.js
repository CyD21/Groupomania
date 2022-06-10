const userController = require("../controllers/userController");
const ctrlToken = require("../middlewares/ctrlToken");

//*Importation du router express
//===============================
const router = require("express").Router();

//*GESTION DES ROUTES UTILISATEUR
//===============================

//Route pour la création d'un utilisateur
router.post("/add", userController.addUser);

//Route de connexion utilisateur
router.post("/login", userController.login);

//Route de gestion des profiles utilisateurs
router.get("/admin/profile/:id", ctrlToken, userController.getAllUsers);
router.get("/profile/:id", ctrlToken, userController.getUserProfile);
router.put("/editProfile/:id", ctrlToken, userController.editProfile);
router.put("/updatePwd/:id", ctrlToken, userController.updatePwd);
router.delete("/delateProfile/:id", ctrlToken, userController.deleteProfile);


//Exportation du routeur
module.exports = router;
