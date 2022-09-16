<script>
import { usersServices } from "../../_services";
import Logo from "../logo.vue";
export default {
  name: "Login_User",
  components: { Logo },
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    UserLogin() {
      usersServices
        .userLogin()
        .then((response) => {
          usersServices.saveToken(response.data.TOKEN);
          this.$store.commit("user", response.data);
          this.$router.push("/articles");
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
    },
  },
};
</script>
<template>
  <div
    class="container vh-100 bg-white col-xl-3 col-md-6 col-10 p-0 d-flex d-flex flex-column justify-content-center"
  >
    <div class="shadow-lg">
      <div class="rounded-top p-2 bg-firstColor">
        <Logo />
      </div>
      <div class="p-4 bg-light">
        <div
          class="text-center text-white fw-lighter rounded fs-4 bg-thirdColor py-2 mb-5"
        >
          <h1 class="fs-5 fw-lighter">Connexion</h1>
        </div>
        <div class="bg-alert">
          <form @submit.prevent="UserLogin">
            <div class="mb-3">
              <div
                class="d-flex justify-content-center aligns-items-center border-bottom"
              >
                <i class="fa-solid fa-envelope p-2"></i>
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  class="form-control text-dark border-0 bg-light"
                  v-model="email"
                  id="email"
                  aria-label="Entrez votre adresse email"
                  aria-labelledby="email"
                />
              </div>
            </div>
            <div class="mb-3">
              <div
                class="d-flex justify-content-center aligns-items-center border-bottom"
              >
                <i class="fa fa-key p-2" aria-hidden="true"></i>
                <input
                  type="password"
                  placeholder="Votre mot de passe"
                  class="form-control text-dark border-0 bg-light"
                  v-model="password"
                  id="password"
                  aria-label="Entrez votre mot de passe"
                  aria-labelledby="password"
                />
              </div>
            </div>
            <div class="text-center">
              <button
                type="submit"
                class="btn btn-thirdColor px-xl-5 text-white mt-5 fs-4 fw-lighter"
              >
                Valider
              </button>
            </div>
          </form>
          <div
            class="container alert alert-danger mt-3 text-center"
            v-if="error"
          >
            {{ error }}
          </div>
        </div>
      </div>
      <div class="bg-thirdColor text-white text-center py-3 rounded-bottom">
        Vous n'avez pas encore de compte,
        <RouterLink to="enregistrement" class="text-white"
          >cliquez-ici</RouterLink
        >
      </div>
    </div>
  </div>
</template>
<style></style>
