const db = require('../models')

//============================================================================
// * MODELE DE BASE
//============================================================================

const Like = db.likes
const Post = db.posts

//============================================================================
// * CREATION D'UN LIKE (POST)                         /api/createlike/:postId
//============================================================================

const createLike = (req, res) => {
  const userToken = req.userToken
  const id = req.params.postId
  let dataLike = {
    UserId : userToken,
    postId : id
  }
    Like.create(
      dataLike
    )      
      .then((like) => {
        addLike(id)
          const message = "Like créé avec succès !"
        res.status(200).json({message, data:like});
      })
      .catch((error) => {
        message = "Echec de la création du like"
        res.status(400).json({message, data:error});
      });
  }
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
// * SUPPRESSION D'UN LIKE (DELETE)                /deleteLike/:postId/:idLike
//============================================================================
const deleteLike = async (req, res) => {
const userToken = req.userToken
const idLike = req.params.idLike
const id = req.params.postId
Like.findByPk(idLike)
.then((like) => {
  if (like.UserId == userToken) {
    console.log("résultat de like.UserId >>>>>>>>>>>>>>>>>>>>>>> " + like.UserId)
    console.log("résultat de userToken   >>>>>>>>>>>>>>>>>>>>>>> " + userToken)
    like.destroy()  
    .then((deleteRecord) => {
      if (deleteRecord){
        delLike(id)
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

 // ===  fonction de calcul des likes après ajout =============================
const delLike = (idpost) => {
  Post.findByPk(idpost)
  .then((post) => {
    let nbLike = post.like
    post.update({
      like: nbLike -1
    })
  })
}

module.exports = {
    createLike,
    deleteLike,
}