//=====================================================
//* Connexion de l'API pour la gestion des posts
//=====================================================

import axios from "axios";

//TODO: Récupération de l'ensemble des posts

let getAllPosts = () => {
  return axios.get("post/getAllPosts");
};

//TODO: Récupération d'un post
//?  @param (id) récupération de l'id du post

let getOnePost = (id) => {
  return axios.get(`post/getOnePost/${id}`);
};

//TODO: Création d'un post
//? @param (formData) récupération du contenu du nouveau post

let createPost = (formData) => {
  return axios.post("post/createPost", formData);
};

//TODO: Modification d'un post
//? @param (id) récupération de l'id du post
//?  @param (formData) récupération de la modification

let modifyPost = (id, formData) => {
  return axios.put(`post/modifyPost/${id}`, formData);
};

//TODO: Suppression d'un post
//? @param (id) récupération de l'id du post

let deletePost = (id) => {
  return axios.delete(`post/deletePost/${id}`);
};

//TODO: Bloquage d'un post
//? @param (id) récupération de l'id du post

let blockPost = (id) => {
  return axios.put(`post/blockPost/${id}`);
};

//TODO: Débloquage d'un post
//? @param (id) récupération de l'id du post

let unBlockPost = (id) => {
  return axios.put(`post/unBlockPost/${id}`);
};

//! Exportation des connections routes POSTS

export const postsServices = {
  getAllPosts,
  getOnePost,
  createPost,
  modifyPost,
  deletePost,
  blockPost,
  unBlockPost,
};
