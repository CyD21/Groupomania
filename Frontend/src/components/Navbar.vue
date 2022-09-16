<script>
import Logo from "./logo.vue";
import { mapGetters } from "vuex";
export default {
  name: "NavBar",
  computed: {
    ...mapGetters(["user"]),
  },
  components: { Logo },
  methods: {
    logOut() {
      localStorage.removeItem("token");
      this.$router.push("/");
    },
  },
};
</script>
<template>
  <div>
    <header>
      <nav class="navbar navbar-expand-lg bg-firstColor">
        <div
          class="container d-flex justify-content-center justify-content-xl-start"
        >
          <Logo />
          <div
            class="collapse navbar-collapse d-flex justify-content-center justify-content-md-center justify-content-xl-end"
            id="navbarNav"
          >
            <ul
              class="navbar-nav d-flex flex-row justify-content-center align-items-center"
              aria-label="Barre de navigation"
            >
              <li class="nav-item">
                <router-link
                  to="/articles"
                  class="nav-link"
                  aria-current="Accueil"
                  aria-label="Page d'accueil"
                >
                  <button
                    class="btn bg-light px-3 me-3"
                    aria-label="Bouton Page d'accueil"
                  >
                    <i class="fa-solid fa-house"></i>
                  </button>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  to="/utilisateur"
                  aria-label="Gestion du profil utilisateur"
                >
                  <button
                    class="btn bg-light px-3 me-3"
                    title="Profil utilisateur"
                    aria-label="Profil utilisateur"
                  >
                    <i class="fa-solid fa-user"></i>
                  </button>
                </router-link>
              </li>
              <!--?Administration -->
              <li v-if="user.isAdmin === 'Administrateur'">
                <router-link
                  to="/administration"
                  class="nav-link text-white"
                  aria-label="Gestion de la page d'administration"
                >
                  <button
                    class="btn bg-light px-3 me-3"
                    title="Administration"
                    aria-label="Page d'administration"
                  >
                    <i class="fa-solid fa-screwdriver-wrench"></i>
                  </button>
                </router-link>
              </li>
              <li v-if="user">
                <button
                  class="btn bg-light px-3 me-3"
                  @click="logOut"
                  aria-label="Déconnexion"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  title="Se déconnecter"
                >
                  <i
                    class="fa fa-unlock"
                    aria-hidden="false"
                    aria-label="Déconnexion"
                  ></i>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  </div>
</template>
<style></style>
