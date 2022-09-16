import axios from "axios";
import router from "../router";
import { usersServices } from "."

axios.defaults.baseURL = import.meta.env.VITE_APP_BASE_API;
axios.defaults.headers.common["Authorization"] = localStorage.getItem("token");
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

//Ajouter un intercepteur de requête
axios.interceptors.request.use(
  function (config) {
    // Faire quelque chose avant que la requête ne soit envoyée
    config.headers["Authorization"] = localStorage.getItem("token");
    return config; // Il est souvent utilisé avec un jeton. Configurez la valeur du jeton sur la clé du jeton et placez la clé du jeton dans l'en-tête de la demande
  },
  function (error) {
    // Faire quelque chose avec une erreur de requête
    return Promise.reject(error);
  }
);
//Ajouter un intercepteur de réponse
axios.interceptors.response.use(
  function (response) {
    // Faire quelque chose avec les données de réponse
    return response;
  },
  function (error) {
    // Faire quelque chose avec une erreur de réponse
    if (error.response.status == 401) {
      usersServices.logout();
      router.push("/authentification")
    } else {
      return Promise.reject(error);
    }
  },
)
export default axios;
