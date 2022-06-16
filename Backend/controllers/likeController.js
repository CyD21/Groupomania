const db = require('../models')

//============================================================================
// * MODELE DE BASE
//============================================================================

const Like = db.likes
const Post = db.posts

//============================================================================
// * CREATION D'UN LIKE (POST)                         /api/createlike/:idPost
//============================================================================

const createLike = (req, res) => {
  const userToken = req.userToken
  let dataLike = {
    userId : userToken,
    postId : req.params.idpost
  }
    Like.create(
      dataLike
    )      
      .then((like) => {
        LikeLenght(req.params.idpost)
          const message = "Like créé avec succès !"
        res.status(200).json({message, data:like});
      })
      .catch((error) => {
        res.status(400).json(error.message);
      });
}
// fonction de calcul des likes

const LikeLenght = (idpost) => {
  Post.findByPk(idpost)
  .then((post) => {
    let nbLike = post.like
    post.update({
      like: nbLike +1
    })
  })
}

//============================================================================
// * SUPPRESSION D'UN LIKE (DELETE)                        /deleteLike/:idLike
//============================================================================
const deleteLike = async (req, res) => {
    const userToken = req.userToken
    const IdLike = req.params.idLike
    Like.findByPk(IdLike)
    .then((like) => {
      if (like.userId == userToken) {
        like.destroy()
        .then((deleteRecord) => {
          if (deleteRecord){
            res.status(200).json({message: 'Like supprimé'})
          }
        })
        .catch((error) => {res.status(400).json(error.message)})
      }
      res.status(200).json({message : "Like supprimé avec succés !"})
    })
    .catch((error) => {res.status(500).json(error.message)})
    
        
}

module.exports = {
    createLike,
    deleteLike,
}