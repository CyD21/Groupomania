<template>
  <nav class="navbar navbar-expand-lg bg-firstColor">
    <div class="container-fluid">
      <a class="navbar-brand col-8">
        <router-link to="/home">
          <Logo />
        </router-link>
      </a>
      <button class="navbar-toggler fs-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon d-flex justify-content-center align-items-center p-0 m-0">
          <i class="fa-solid fa-bars text-white"></i>
        </span>
      </button>
      <div class="collapse navbar-collapse justify-content-md-end" id="navbarNav">
        <ul class="navbar-nav text-white d-flex flex-row justify-content-center">
          <li class="nav-item">
            <router-link to="/home" class="nav-link text-white active" aria-current="Accueil">
              <button class="btn bg-light px-3 me-3 text-thirdColor" title="Accueil">
                <i class="fa-solid fa-house"></i>
              </button>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/profile">
              <a class="nav-link text-white">
                <button class="btn bg-light px-3 me-3 text-thirdColor" title="Votre profil">
                  <i class="fa-solid fa-user"></i>
                </button>
              </a>
            </router-link>
          </li>
          <li v-if="!user">
            <router-link to="/login" class="nav-link text-white">
              <button class="btn bg-light px-3 me-3 text-thirdColor" title="Se connecter">
                <i class="fa-solid fa-arrow-right-to-bracket"></i>
              </button>
            </router-link>
          </li>
          <!--?Administration -->
          <li>
            <router-link to="/admin" class="nav-link text-white">
              <button class="btn bg-light px-3 me-3 text-thirdColor" title="Administration">
                <i class="fa-solid fa-screwdriver-wrench"></i>
              </button>
            </router-link>
          </li>
          <li v-if="user">
            <a href="javascript:void(0)" @click="logOut" class="nav-link text-white" title="Se déconnecter">
              <button class="btn bg-light px-3 me-3 text-thirdColor" data-bs-toggle="tooltip" data-bs-placement="bottom"
                title="Se déconnecter">
                <i class="fa fa-unlock" aria-hidden="true"></i>
              </button>
            </a>
          </li>
          <li>
            <router-link v-if="!user" to="/register" class="nav-link text-white" title="S'enregistrer">
              <button class="btn bg-light px-3 me-3 text-thirdColor">
                <i class="fa-solid fa-address-card"></i>
              </button>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import Logo from "./logo.vue";
import { mapGetters } from "vuex";
export default {
  components: { Logo },
  methods: {
    logOut() {
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
  },
  computed: {
    ...mapGetters(["user"]),
  },
};
</script>
<style>
</style>
