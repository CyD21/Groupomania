//Importation des packages de node
const express = require('express');
const likeController = require("../controllers/likeController");
const ctrlToken = require("../middlewares/ctrlToken");

//Création d'un routeur
const router = express.Router();


//Création des routes
router.post('/createLike/:postId', ctrlToken, likeController.createLike);
router.delete('/deleteLike/:postId/:idLike', ctrlToken, likeController.deleteLike);

//Exportation du routeur de l'utilisateur
module.exports = router;