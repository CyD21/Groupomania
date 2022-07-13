<template>
  <nav class="navbar navbar-expand-lg bg-firstColor">
    <div class="container-fluid">
      <a class="navbar-brand"><Logo /></a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon bg-light"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav text-white">
          <li class="nav-item">
            <router-link to="/home" class="nav-link text-white active" aria-current="Accueil">
              <i class="fa-solid fa-house"></i>
            </router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link text-white"><i class="fa-solid fa-user"></i></a>
          </li>
          <li v-if="!user">
            <router-link to="/login" class="nav-link text-white">
              Se connecter
            </router-link> 
          </li>
          <li v-if="user">
            <a href="javascript:void(0)" @click="logOut" class="nav-link text-white">
              Se déconnecter
            </a> 
          </li>
          <li>
            <router-link v-if="!user" to="/register" class="nav-link text-white">
              S'inscrire
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import Logo from "./logo.vue";
export default {
  props: ["user"],
  methods: {
    logOut() {
      localStorage.removeItem("TOKEN");
      this.$router.push("/login");
    }
  },
  components: { Logo }
};
</script>
<style></style>
