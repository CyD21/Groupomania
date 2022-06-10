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
  const Id = req.params.id;
  const description = req.body.description;
  const image = req.file.filename;
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
    status: 0,
    UserId: Id,
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
// * RECUPERATION DE L'ENSEMBLE DES ARTICLES (GET)                /api/article
//============================================================================

const listPosts = async (req, res) => {
  Post.findAll({
    include: [
      {
        model: User,
        as: "users",
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
      res.status(400).json(error.message);
    });
};

//============================================================================
// * RECUPERATION D'UN ARTICLE (GET)                           /api/article/id
//============================================================================
const getOneArticle = async (req, res) => {
  Article.findByPk(req.params.id)
    .then((article) => {
      if (article === null) {
        const message = "L'article que vous avez demandé n'existe pas";
        res.json({ message, data: article });
      } else {
        const message = `L'article que vous avez demandé a bien été trouvé.`;
        res.json({ message, data: User });
      }
    })
    .catch((error) => {
      const message =
        "L'article n'a pu être récupéré. Réessayez dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
};

//============================================================================
// * SUPPRESSION D'UN ARTICLE (DELETE)                        /api/articles/id
//============================================================================

const removePost = async (req, res) => {
  const Id = req.params.id;
  const idPost = req.params.id;
  if (!idPost) {
    return res.status(400).json({ message: "Unknown post to delete" });
  }
  await Post.findByPk(idPost)
    .then((post) => {
      if (post.UserId === Id) {
        fs.unlink("./public/images/" + post.image, (err) => {
          if (err) res.status(500).send({ message: err });
          post
            .destroy()
            .then(function (deletedRecord) {
              if (deletedRecord) {
                res.status(200).json({ message: "Deleted successfully" });
              } else {
                res.status(404).json({ message: "record not found" });
              }
            })
            .catch(function (error) {
              res.status(500).json(error);
            });
        });
      } else {
        res.status(403).json({ message: "Law not allowed" });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
};

//============================================================================
//* VERROUILLAGE D'UN ARTICLE
//============================================================================

const blockedPost = (req, res) => {
  const Id = req.params.id;
  //user law
  User.findByPk(Id)
    .then((user) => {
      if (user.isAdmin === "moderator") {
        var idPost = req.params.id;
        if (!idPost) {
          return res.status(400).json({ message: "Unknown post to blocked" });
        }
        Post.update({ status: 1 }, { where: { id: idPost } })
          .then((post) => {
            res.status(200).json({ message: "Post blocked successfully" });
          })
          .catch((error) => {
            res.status(404).json({ message: error.message });
          });
      } else {
        res
          .status("401")
          .json({ message: "Your are not allowed to block this post." });
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
  removePost,
  blockedPost,
};
