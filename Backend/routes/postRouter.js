const articleController = require("../controllers/postController");
const multer = require("../middlewares/multer-config")
const ctrlToken = require("../middlewares/ctrlToken")
const path = require("path")

//*Importation du router express
//===============================
const router = require("express").Router();

//*GESTION DES ROUTES ARTICLES
//===============================

router.post("/createPost", ctrlToken, multer, articleController.addPost);
router.get("/listPosts", ctrlToken, articleController.listPosts);
router.delete("/deletePost/:id", ctrlToken, articleController.deletePost);
router.put("/blockPost/:idpost", ctrlToken, articleController.blockPost);


//*Exportation du routeur
//===============================
module.exports = router;
