import { createRouter, createWebHistory } from "vue-router";
import register from "@/views/RegisterPage.vue";
import login from "@/views/LoginPage.vue";
import home from "@/views/HomePage.vue";
import profile from "@/views/ProfilePage.vue";


const routes = [
  {
    path: "/",
    name: "Accueil",
    component: login,
  },
  {
    path: "/register",
    name: "register",
    component: register,
  },
  {
    path: "/login",
    name: "login",
    component: login,
  },
  {
    path: "/profile",
    name: "profile",
    component: profile,
  },
  {
    path: "/home",
    name: "home",
    component: home,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
