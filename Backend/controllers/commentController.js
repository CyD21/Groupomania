const db = require('../models')
const jwtUtils = require('../utils/jwt')

//============================================================================
// * MODELE DE BASE
//============================================================================

const Comment = db.comments
const User = db.users

//============================================================================
// * CREATION D'UN COMMENTAIRE (POST)                             /api/article
//============================================================================

const createComment = (req, res) => {
    const Id = req.params.id;
  Comment.findOne({ where: { id: Id } })
    .then(comment => {
      Comment.create({
        include: [{ model: User }, { model: comment }],
        content: req.body.content,
        UserId: Id,
        commentId: req.params.id
      })
        .then(() => res.status(201).json({ message: 'Commentaire enregistré' }))
        .catch(error => res.status(400).json({ message: error.message }));
    })
    .catch(error => { res.status(403).json({ message: error.message }) });

}

//============================================================================
// * RECUPERATION DE L'ENSEMBLE DES ARTICLES (GET)                /api/article
//============================================================================

const getAllComments = async(req, res) => {
    
}
//============================================================================
// * RECUPERATION D'UN ARTICLE (GET)                           /api/article/id
//============================================================================
const updateComment = async (req, res) => {
  
};

//============================================================================
// * SUPPRESSION D'UN ARTICLE (DELETE)                        /api/articles/id
//============================================================================

const deleteComment = async(req, res) => {
    
}

module.exports = {
    createComment,
    getAllComments,
    updateComment,
    deleteComment,
}