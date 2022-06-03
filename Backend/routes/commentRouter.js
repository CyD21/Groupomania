//Importation des packages de node
const express = require('express');
const commentController = require("../controllers/commentController");
const ctrlToken = require("../middlewares/ctrlToken");

//Création d'un routeur
const router = express.Router();


//Création des routes
router.post('/:id/createcomment', ctrlToken, commentController.createComment);
router.get('/:id/comment', ctrlToken, commentController.getAllComments);
router.put('/:id/comment/:id', ctrlToken, commentController.updateComment);
router.delete('/:id/comment/:id', ctrlToken, commentController.deleteComment);

//Exportation du routeur de l'utilisateur
module.exports = router;