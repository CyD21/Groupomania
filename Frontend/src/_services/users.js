//=====================================================
//* Connexion de l'API pour la gestion des utilisateurs
//=====================================================

import axios from "axios";

//TODO: Login

let userLogin = () => {
  return axios.post("user/login", {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  });
};

//TODO: création d'un utilisateur

let userSubmit = () => {
  return axios.post("user/add", {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  });
};

//TODO: Mise à jour du profil utilisateur

let updateProfile = (formData) => {
  return axios.put("user/editProfile", formData);
};

//TODO: Mise à jour du mot de passe utilisateur

let updatePassword = () => {
  return axios.put("user/updatePwd", {
    oldPassword: document.getElementById("oldPassword").value,
    newPassword: document.getElementById("newPassword").value,
    confirmPassword: document.getElementById("confirmPassword").value,
  });
};

//TODO: Suppression du compte utilisateur

let deleteAccount = (id) => {
  return axios.delete(`user/deleteProfile/${id}`);
};

//TODO: appel du profil utilisateur

let getProfile = () => {
  return axios.get("user/profile");
};

//TODO: suppression du profil utilisateur

let deleteProfile = () => {
  return axios.delete("user/deleteProfile");
};

//TODO: Récupération de tous les profils utilisateurs

let getAllProfiles = () => {
  return axios.get("user/admin/profile");
};

//=====================================================
//* Gestion du TOKEN dans le localStorage
//=====================================================

//TODO: Sauvegarde du token

let saveToken = (token) => {
  return localStorage.setItem("token", token);
};

//TODO: Récupération du token

let getToken = () => {
  return localStorage.getItem("token");
};

//TODO: Suppression du Token pour la deconnexion utilisateur

let logout = () => {
  localStorage.removeItem("token");
};

//* Exportation des services utilisateurs

export const usersServices = {
  userLogin,
  userSubmit,
  saveToken,
  getToken,
  logout,
  getProfile,
  updateProfile,
  deleteAccount,
  updatePassword,
  deleteProfile,
  getAllProfiles,
};
