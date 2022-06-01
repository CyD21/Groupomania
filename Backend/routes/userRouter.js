const userController = require("../controllers/userController.js");
//const auth = require("../auth/auth");

//* Importation des middlewares
//===============================
const validEmail = require("../middlewares/validEmail")
const validPassword = require("../middlewares/validPassword")

//*Importation du router express
//===============================
const router = require("express").Router();

//*GESTION DES ROUTES UTILISATEUR
//===============================

//Route pour la création d'un utilisateur
router.post("/add", validPassword, validEmail, userController.addUser);

//Route de connexion utilisateur
router.post("/login", validPassword, validEmail, userController.login);

//Route de gestion des profiles utilisateurs
router.get("/profile", userController.getAllProfile);
router.get("/profile/:id", userController.userProfile);
router.put("/profile/:id", userController.updateProfile);
router.delete("/profile/:id", userController.deleteProfile);


//Exportation du routeur
module.exports = router;
