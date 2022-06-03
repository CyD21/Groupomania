const db = require('../models')
const jwtUtils = require('../utils/jwt')
const fs = require('fs')

//============================================================================
// * MODELE DE BASE
//============================================================================

const Article = db.article
const User = db.users

//============================================================================
// * CREATION D'UN ARTICLE (POST)                                 /api/article
//============================================================================

const addArticle = (req, res) => {
    var headerAuth = req.headers['authorization'];
    var userId = jwtUtils.getUserId(headerAuth)
    if (userId < 0) {
        res.status(400).json({ 'message': 'wrong token' });
    }
    const description = req.body.description
    const image = req.file.filename
    if (description === "") {
        res.status(404).json({ 'message': 'description is required' });
    }
    if (description.length < 100) {
        res.status(500).json({ 'message': 'description must be at least 100 characters' })
    }
    if (!image) {
        res.status(400).send({ 'message': 'Please upload a file.' })
    }

    Article.create({
        description: description,
        image: image,
        status: 0,
        UserId: userId,
    }).then((postMessage) => {
        console.log(postMessage)
        res.status(200).json({ 'message': 'Post created successfully' })
    }).catch((error) => {
        res.status(400).json({ 'error': error.message })
    })

}

//============================================================================
// * RECUPERATION DE L'ENSEMBLE DES ARTICLES (GET)                /api/article
//============================================================================

const getAllArticles = async(req, res) => {
    var headerAuth = req.headers['authorization'];
    var userId = jwtUtils.getUserId(headerAuth)
    if (userId < 0) {
        res.status(400).json({ 'message': 'wrong token' });
    }
    await Article.findAll({
        include: [{
            model: User,
            attributes: ['name', 'isAdmin'],
        }],
        order: [
            ['createdAt', 'DESC']
        ]
    }).then((posts) => {
        res.status(200).json(posts)
    }).catch((error) => {
        res.status(400).json(error.message)
    })
}
//============================================================================
// * RECUPERATION D'UN ARTICLE (GET)                           /api/article/id
//============================================================================
const getOneArticle = async (req, res) => {
  let headersAuth = req.headers["authorization"]
  let userId = jwtUtils.getUserId(headersAuth)
  if (userId < 0) {
    const message = "Le token est invalide"
    res.status(404).json({message})
  }
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

const deleteArticle = async(req, res) => {
    var headerAuth = req.headers['authorization'];
    var userId = jwtUtils.getUserId(headerAuth)
    if (userId < 0) {
        res.status(400).json({ 'message': 'wrong token' });
    }
    var idArticle = req.params.id;
    if (!idArticle) { return res.status(400).json({ 'message': 'Unknown post to delete' }); }
    console.log(req.params.id)
    await Article.findByPk(idArticle)
        .then((article) => {
            if (article.UserId === userId) {
                fs.unlink('./public/images/' + article.image, (err) => {
                    if (err) res.status(500).send({ 'message': err });
                    article.destroy()
                        .then(function(deletedRecord) {
                            if (deletedRecord) {
                                res.status(200).json({ message: "Deleted successfully" });
                            } else {
                                res.status(404).json({ message: "record not found" })
                            }
                        })
                        .catch(function(error) {
                            res.status(500).json(error);
                        });
                })
            } else {
                res.status(403).json({ 'message': 'Law not allowed' });
            }
        }).catch((error) => {
            res.status(500).json({ 'message': error.message });
        })
}

//============================================================================
//* VERROUILLAGE D'UN ARTICLE
//============================================================================

const blockedArticle = (req, res) => {
    var headerAuth = req.headers['authorization'];
    var userId = jwtUtils.getUserId(headerAuth)
    if (userId < 0) {
        res.status(400).json({ 'message': 'wrong token' });
    }
    User.findByPk(userId)
        .then((user) => {
            if (user.isAdmin === "moderator") {
                var idArticle = req.params.id
                if (!idArticle) { return res.status(400).json({ 'message': 'Unknown post to blocked' }); }
                Article.update({ status: 1 }, { where: { id: idArticle } })
                    .then((article) => {
                        res.status(200).json({ 'message': 'Post blocked successfully' })
                    }).catch((error) => {
                        res.status(404).json({ 'message': error.message })
                    })
            } else {
                res.status("401").json({ 'message': 'Your are not allowed to block this post.' })
            }
        }).catch((error) => {
            res.status(error.status).json({ 'message': error.message })
        })
}

module.exports = {
    addArticle,
    getAllArticles,
    getOneArticle,
    deleteArticle,
    blockedArticle
}