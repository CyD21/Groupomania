const db = require('../models')

//============================================================================
// * MODELE DE BASE
//============================================================================

const Comment = db.comments
const Post = db.posts

//============================================================================
// * CREATION D'UN COMMENTAIRE (POST)               /api/createcomment/:idpost
//============================================================================

const createComment = (req, res) => {
  const Id = req.userToken
  console.log("userId" + Id)
  let dataComment = {
    content: req.body.content,
    UserId : Id,
    postId : req.params.idpost
  }
    Comment.create(
      dataComment
    )      
      .then((posts) => {
          const message = "Commentaire créé avec succès !"
        res.status(200).json({message, data:posts});
      })
      .catch((error) => {
        res.status(400).json(error.message);
      });
 }


//============================================================================
// * SUPPRESSION D'UN COMMENTAIRE (DELETE)       /api/deletecomment/:idcomment
//============================================================================
const deleteComment = async(req, res) => {
    const Idcomment = req.params.idcomment
    const userToken = req.userToken
    Comment.findByPk(Idcomment)
    .then((comment) => {
      if (comment.userId == userToken) {
        comment.destroy()
        .then((deleteRecord) => {
          if (deleteRecord){
            res.status(200).json({message: 'Commentaire supprimé'})
          }
        })
        .catch((error) => {res.status(400).json(error.message)})
      }
      res.status(200).json({message : "Commentaire supprimé avec succés !"})
    })
    .catch((error) => {res.status(500).json(error.message)})
    
        
}

module.exports = {
    createComment,
    deleteComment,
}