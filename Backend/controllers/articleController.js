const db = require('../models')
const fs = require('fs')

//============================================================================
// * MODELE DE BASE
//============================================================================

const Article = db.articles
const User = db.users

//============================================================================
// * CREATION D'UN ARTICLE (POST)                                 /api/article
//============================================================================

const addArticle = (req, res) => {
    const Id = req.params.id    
    const description = req.body.description
    const image = req.file.filename
    if (description === "") {
        const message = "Le champ description est obligatoire"
        res.status(404).json({ message });
    }
    if (description.length < 100) {
        const message = "Le champ description doit être égal ou supérieur à 100 caractères"
        res.status(500).json({ message })
    }
    if (!image) {
        const message = "Vous devez enregistrer une image !"
        res.status(400).send({ message })
    }
    Article.create({
        description: description,
        image: image,
        status: 0,
        UserId: Id,
    }).then((postMessage) => {
        const message = "Article enregistré avec succès !"
        res.status(200).json({ message })
    }).catch((error) => {
        res.status(400).json({ 'error': error.message })
    })

}

//============================================================================
// * RECUPERATION DE L'ENSEMBLE DES ARTICLES (GET)                /api/article
//============================================================================

const getAllArticles = async(req, res) => {
    Article.findAll({
        include: [{
            model: User,
            attributes: ['name', 'isAdmin'],
        }],
        order: [
            ['createdAt', 'DESC']
        ]
    }).then((articles) => {
        res.status(200).json(articles)
    }).catch((error) => {
        const message = "La liste des articles est vide...";
        res.status(400).json({message})
    })
}
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

const deleteArticle = async(req, res) => {
    var idArticle = req.params.id;
    if (!idArticle) { 
        const message = "Ce message est inconnu, impossible de le supprimer"
        return res.status(400).json({ message }); }
    console.log(req.params.id)
    await Article.findByPk(idArticle)
        .then((article) => {
            if (article.UserId === userId) {
                fs.unlink('./public/images/' + article.image, (err) => {
                    if (err) res.status(500).send({ 'message': err });
                    article.destroy()
                        .then(function(deletedRecord) {
                            if (deletedRecord) {
                                const message = "Article supprimé"
                                res.status(200).json({ message });
                            } else {
                                const message = "L'article n'a pas été supprimé !"
                                res.status(404).json({ message })
                            }
                        })
                        .catch(function(error) {
                            res.status(500).json(error);
                        });
                })
            } else {
                const message = "Cette action n'est pas autorisée !"
                res.status(403).json({ message });
            }
        }).catch((error) => {
            res.status(500).json({ 'message': error.message });
        })
}

//============================================================================
//* VERROUILLAGE D'UN ARTICLE
//============================================================================

const blockedArticle = (req, res) => {
    const Id = req.params.id
    User.findByPk(Id)
        .then((user) => {
            if (user.isAdmin === "moderator") {
                var idArticle = req.params.id
                if (!idArticle) {
                    const message = "Article inconnu"
                    return res.status(400).json({ message });
                }
                Article.update({ status: 1 }, { where: { id: idArticle } })
                    .then((article) => {
                        const message = "Article bloqué avec succès"
                        res.status(200).json({ message })
                    }).catch((error) => {
                        res.status(404).json({ 'message': error.message })
                    })
            } else {
                const message = "Vous ne disposez pas des droits pour bloquer cette Article"
                res.status("401").json({ message })
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