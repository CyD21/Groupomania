const userController = require("../controllers/postRouter.js");
//const auth = require("../auth/auth");

//* Importation des middlewares
//===============================


//*Importation du router express
//===============================
const router = require("express").Router();

//*GESTION DES ROUTES ARTICLES
//===============================

router.get("/article", userController.getAllArticles);
router.get("/article/:id", userController.getOneArticle);
router.post("/article/:id", userController.createArticle);
router.put("/article/:id", userController.updateArticle);
router.delete("/article/:id", userController.deleteArticle);


//Exportation du routeur
module.exports = router;
