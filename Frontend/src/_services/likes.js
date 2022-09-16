//=====================================================
//* Connexion de l'API  pour la gestion des likes
//=====================================================

import axios from "axios";

//TODO: Gestion du like utilisateur
//?  @param (id) récupération de l'id du post

let likeOrNot = (id) => {
  return axios.get(`like/gestionLike/${id}`);
};

//* Exportation de la connection de gestion du like

export const likesServices = {
  likeOrNot,
};
