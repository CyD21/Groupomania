import { createRouter, createWebHistory } from "vue-router";
import Register from "@/views/RegisterPage.vue";
import Login from "@/views/LoginPage.vue";
import Home from "@/views/HomePage.vue";
import Profile from "@/views/ProfilePage.vue";
import Admin from "@/views/AdministratorPage.vue";

const routes = [
  {
    path: "/",
    name: "Accueil",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
  },
  {
    path: "/home",
    name: "home",
    component: Home,
  },
  {
    path: "/admin",
    name: "Administration",
    component: Admin,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
