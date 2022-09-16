import { createRouter, createWebHistory } from "vue-router";
import Register from "@/views/RegisterPage.vue";
import Login from "@/views/LoginPage.vue";
import Home from "@/views/HomePage.vue";
import Profile from "@/views/UserPage.vue";
import Admin from "@/views/AdminPage.vue";

const routes = [
  {
    path: "/",
    name: "Accueil",
    component: Login,
  },
  {
    path: "/enregistrement",
    name: "enregistrement",
    component: Register,
  },
  {
    path: "/authentification",
    name: "authentification",
    component: Login,
  },
  {
    path: "/utilisateur",
    name: "profil",
    component: Profile,
  },
  {
    path: "/articles",
    name: "articles",
    component: Home,
  },
  {
    path: "/administration",
    name: "administration",
    component: Admin,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
export default router;
