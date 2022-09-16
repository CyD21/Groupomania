const db = require("../models");

//============================================================================
// * MODELE DE BASE
//============================================================================
const Like = db.likes;
const Post = db.posts;

//============================================================================
// * fonction pour l'ajout d'un like                         
//============================================================================
const createLike = (id, userToken) => {
  let dataLike = {
    UserId: userToken,
    postId: id,
  };
  Like.create(dataLike);
};

//============================================================================
// * Fonction pour la suppression d'un like                
//============================================================================
const deleteLike = async (id, userToken) => {
  Like.findOne({ where: { userId: userToken, postId: id } })
    .then((like) => {
      like.destroy();
    });
};

//============================================================================
// * STATUTS DES LIKES UTILISATEURS (GET)            /like/gestionLike/:postId                
//============================================================================
const getLikeBypostUser = (req, res) => {
  const userToken = req.userToken;
  const id = req.params.postId;
  Like.findOne({ where: { userId: userToken, postId: id } })
    .then((like) => {
      if (like) {
        res.status(200).json({ message: "L'utilisateur aime ce post" });
      } else {
        res.status(200).json({ message: "L'utilisateur n'aime pas encore ce post" });
      }
    })
    .catch((error) => {
      const message = "Echec de la récupération du statut pour le like"
      res.status(500).json({ message, data: error });
    });
};

//============================================================================
// * GESTION D'AJOUT ET DE SUPPRESSION D'UN LIKE  (GET)  /like/getLike/:postId                
//============================================================================
const gestionLike = (req, res) => {
  const userToken = req.userToken;
  const id = req.params.postId;
  Like.findOne({ where: { userId: userToken, postId: id } })
    .then((like) => {
      Post.findByPk(id).then((post) => {
        let nbLike = post.like;
        if (like) {
          deleteLike(id, userToken);
          post.update({
            like: nbLike - 1,
          })
            .then(() => {
              res.status(200).json({ message: "L'utilisateur n'aime pas ce post" });
            })
            .catch((error) => {
              const message = "Echec de suppression du like"
              res.status(400).json({ message, data: error });
            });
        } else {
          createLike(id, userToken);
          post.update({
            like: nbLike + 1,
          })
            .then(() => {
              res.status(200).json({ message: "L'utilisateur aime ce post" });
            })
            .catch((error) => {
              const message = "Echec du like"
              res.status(400).json({ message, data: error });
            });
        }
      });
    })
    .catch((error) => {
      const message = "Impossible de poster un like sur ce post pour le moment"
      res.status(500).json({ message, data: error });
    });
};

module.exports = {
  gestionLike,
  getLikeBypostUser,
};
