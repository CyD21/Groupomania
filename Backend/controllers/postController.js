const db = require("../models");
const jwtUtils = require("../utils/jwt");
const fs = require("fs");

//============================================================================
// * MODELE DE BASE
//============================================================================

const Post = db.posts;
const User = db.users;
const Comment = db.comments;

//============================================================================
// * CREATION D'UN ARTICLE (POST)                                 /api/article
//============================================================================

const addPost = (req, res) => {
  const userToken = req.userToken;
  const description = req.body.description;
  const author = User.name
  const image = `${req.protocol}://${req.get("host")}/public/images/${req.file.filename}`;
  if (description === "") {
    res.status(404).json({ message: "La description est obligatoire" });
  }
  if (description.length < 100) {
    res
      .status(500)
      .json({ message: "La description doit contenir au moins 100 caractères" });
  }
  if (!image) {
    res.status(400).send({ message: "Veuillez insérer une image." });
  }
  Post.create({
    description: description,
    image: image,
    name: author,
    status: 0,
    UserId: userToken,
  })
    .then((postMessage) => {
      console.log(postMessage);
      res.status(200).json({ message: "Article créé avec succès" });
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
};

//============================================================================
// * RECUPERATION DE L'ENSEMBLE DES ARTICLES (GET)          /api/post/listPost
//============================================================================

const listPosts = async (req, res) => {
  Post.findAll({
    include: [
      {
        model: User,
        attributes: ["name", "isAdmin"],
      },
      {
        model: Comment,
        as: "comments",
        include: {
        model: User,
        attributes: ["name"]  
        }
      }
    ],
    order: [["createdAt", "DESC"]],
  })
    .then((posts) => {
        const message = "La liste des articles a été récupérer avec succés"
      res.status(200).json({message, data:posts});
    })
    .catch((error) => {
      const message = "Impossible de récupérer la liste des articles pour le moment"
      res.status(400).json({message, data:error});
    });
};


//============================================================================
// * SUPPRESSION D'UN ARTICLE (DELETE)                        /api/articles/id
//============================================================================

const deletePost = async (req, res) => {
  const userToken = req.userToken;
  const idPost = req.params.id;
  if (!idPost) {
    return res.status(400).json({ message: "Ce post n'existe pas" });
  }
  Post.findByPk(idPost)
    .then((post) => {
      if (post.UserId === userToken) {
        fs.unlink("./public/images/" + post.image, (err) => {
          if (err) res.status(500).send({ message: err });
          post
            .destroy()
            .then(function (deletedRecord) {
              if (deletedRecord) {
                res.status(200).json({ message: "Post supprimé avec succés" });
              } else {
                res.status(404).json({ message: "Echec de la suppression du post" });
              }
            })
            .catch(function (error) {
              res.status(500).json(error);
            });
        });
      } else {
        res.status(403).json({ message: "Vous ne disposez pas des droits pour cette action" });
      }
    })
    .catch((error) => {
      const message = "Suppression du post non disponible pour le moment"
      res.status(500).json({ message: error.message });
    });
};

//============================================================================
//* VERROUILLAGE D'UN ARTICLE
//============================================================================

const blockPost = (req, res) => {
  const userToken = req.userToken;
  User.findByPk(userToken)
    .then((user) => {
      if (user.isAdmin === "moderator" && user.isAdmin === "admin") {
        var idPost = req.params.id;
        if (!idPost) {
          return res.status(400).json({ message: "Ce post n'existe pas" });
        }
        Post.update({ status: 1 }, { where: { id: idPost } })
          .then((post) => {
            res.status(200).json({ message: "Post blocked successfullyCe post a été bloquer avec succès" });
          })
          .catch((error) => {
            res.status(404).json({ message: error.message });
          });
      } else {
        res
          .status(401)
          .json({ message: "Vous ne disposez pas des droits nécéssaires" });
      }
    })
    .catch((error) => {
      res.status(error.status).json({ message: error.message });
    });
};

module.exports = {
  addPost,
  listPosts,
  //getOneArticle,
  deletePost,
  blockPost,
};
