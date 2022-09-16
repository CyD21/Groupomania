//=====================================================
//* Connexion de l'API pour la gestion des commentaires
//=====================================================

import axios from "axios";

// TODO: Création d'un commentaire
//?  @param (id) récupération de l'id du post
//?  @param (dataComments) récupération du contenu du commentaire  


let createComment = (id, dataComments) => {
  return axios.post(`comment/createComment/${id}`, dataComments);
};

//TODO: Suppréssion d'un commentaire
//?  @param (id) récupération de l'id du post

let deleteComments = (id) => {
  return axios.delete(`comment/deleteComment/${id}`);
};

//* Exporation des routes de gestion des commentaires

export const commentsServices = {
  createComment,
  deleteComments,
};
