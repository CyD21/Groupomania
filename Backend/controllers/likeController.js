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
  const Id = req.params.postId
  let dataLike = {
    UserId : userToken,
    postId : Id
  }
  if (userToken == Id) {
    const message = "Vous avez déjà liké ce post"
    res.status(400).json({ message })
  } else {
    Like.create(
      dataLike
    )      
      .then((like) => {
        addLike(Id)
          const message = "Like créé avec succès !"
        res.status(200).json({message, data:like});
      })
      .catch((error) => {
        message = "Echec de la création du like"
        res.status(400).json({message, data:error});
      });
  }}
// ===  fonction de calcul des likes après ajout =============================
const addLike = (idpost) => {
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
  if (like.UserId == userToken) {
    like.destroy()
    .then((deleteRecord) => {
      if (deleteRecord){
        res.status(200).json({message: 'Like annulé avec succés'})
      }
    })
    .catch((error) => {
      const message = "Echec de l'annulation du like"
      res.status(400).json({ message, data:error})})
    }
  })
  .catch((error) => {
    const message = "Impossible d'annuler ce like pour le moment"
    res.status(500).json({ message, data:error })})
  }
  
  // ===  fonction de calcul des likes après annulation =============================
  

module.exports = {
    createLike,
    deleteLike,
}