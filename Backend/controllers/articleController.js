const db = require("../models");
const { Op } = require("sequelize");

//============================================================================
// * MODELE DE BASE
//============================================================================
const User = db.userModel;
const Article = db.articleModel;
const Like = db.likeModel;
const Comment = db.commentModel;

//============================================================================
// * RECUPERATION DE TOUS LES ARTICLES (GET)                      /api/article
//============================================================================
const getAllArticle = async (res, req) => {
  if (Article.length === 0) {
    const message = "Il n'y a pour l'instant aucun article";
    return res.status(201).json({ message });
  } else {
  Article.findAll({
    order: [["id", "DESC"]],
    include: [ User, Like, { model: Comment, include: User } ],
  })
  .then((response) => res.status(200).json(response))
  .catch(error => res.status(400).json({ message: error.message }));
};

//============================================================================
// * RECUPERATION D'UN ARTICLE (GET)                              /api/article
//============================================================================
const getOneArticle = async (res, req) => {
  Message.findOne({ 
    where: { id: User.id },
    include: [ User, Comment, Like]
  })
    .then((response) => res.status(200).json(response))
    .catch(error => res.status(400).json({ message: error.message }));
};

//============================================================================
// * AJOUT D'UN ARTICLE (POST)                                 /api/article/id
//============================================================================
const createArticle = async (res, req) => {};

//============================================================================
// * MISE A JOUR D'UN ARTICLE (PUT)                            /api/article/id
//============================================================================
const updateArticle = async (res, req) => {};

//============================================================================
// * SUPPRESION D'UN ARTICLE (DELETE)                          /api/article/id
//============================================================================
const deleteArticle = async (res, req) => {};

module.exports = {
  createArticle,
  getAllArticle,
  getOneArticle,
  updateArticle,
  deleteArticle,
};
