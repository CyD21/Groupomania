import { createRouter, createWebHistory, useRoute } from "vue-router";
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
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: "/home",
    name: "home",
    component: Home,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: "/admin",
    name: "Administration",
    component: Admin,
    meta: {
      requiresAuth: true,
    }
  },
];


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});


// use : Global Before Guards to prevent the security of each route
// site : https://newbedev.com/vuejs-redirect-from-login-register-to-home-if-already-loggedin-redirect-from-other-pages-to-login-if-not-loggedin-in-vue-router
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!localStorage.getItem("token")) {
      next({ name: "login" });
    } else {
      next() // go to wherever I'm going
    }
  } else {
    next() // does not require auth, make sure to always call next()!
  }
})
export default router;
