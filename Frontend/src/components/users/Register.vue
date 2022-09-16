<script>
import { usersServices } from "../../_services";
import logo from "../logo.vue";
export default {
  name: "Register_User",
  components: { logo },
  data() {
    return {
      dataUser: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      },
      error: "",
    };
  },
  methods: {
    //================================================================
    //* Enregistrement de l'utilisateur
    //? Si les conditions sont remplis on log l'utilisateur
    //  @ email
    //  @ password
    //================================================================
    UserSubmit() {
      const email = this.dataUser.email;
      const password = this.dataUser.password;
      usersServices
        .userSubmit()
        .then(() => {
          this.UserLogin(email, password);
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
    },
    //================================================================
    //* Login de l'utilisateur
    //  @ email
    //  @ password
    //================================================================
    UserLogin() {
      usersServices
        .userLogin()
        .then((res) => {
          usersServices.saveToken(res.data.TOKEN);
          this.$router.push("/utilisateur");
        })
        .catch((error) => {
          console.log(error);
          this.error = error.response.message;
        });
    },
  },
};
</script>
<template>
  <div
    class="container vh-100 col-xl-3 col-md-6 col-10 p-0 d-flex d-flex flex-column justify-content-center"
  >
    <div class="shadow-lg rounded">
      <div class="bg-firstColor rounded-top p-2">
        <logo />
      </div>
      <div class="p-4 bg-light">
        <div
          class="text-center text-white fw-lighter rounded fs-4 bg-thirdColor py-2 mb-5"
        >
          <h1 class="fs-4 fw-lighter">Inscription</h1>
        </div>
        <div>
          <form @submit.prevent="UserSubmit">
            <div class="mb-3">
              <span for="firstname" class="form-label"> Votre Prénom </span>
              <input
                type="text"
                class="form-control"
                v-model="dataUser.firstName"
                id="firstName"
                aria-label="Entrez votre prénom"
                aria-labelledby="firstName"
              />
            </div>
            <div class="mb-3">
              <span for="lastName" class="form-label"> Votre nom </span>
              <input
                type="text"
                class="form-control"
                v-model="dataUser.lastName"
                id="lastName"
                aria-label="Entrez votre nom"
                aria-describedby="lastName"
              />
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">
                Votre adresse email
              </label>
              <input
                type="email"
                class="form-control"
                v-model="dataUser.email"
                id="email"
                aria-label="Entrez votre adresse email"
                aria-describedby="email"
              />
              <span
                id="emailHelp"
                class="form-text text-dark"
                aria-label="Nous ne partagerons jamais votre email"
              >
                Nous ne partagerons jamais votre e-mail.
              </span>
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">
                Votre mot de passe
              </label>
              <input
                type="password"
                class="form-control"
                v-model="dataUser.password"
                id="password"
                aria-label="Entrez un mot de passe"
                aria-describedby="password"
              />
            </div>
            <div class="text-center">
              <button
                type="submit"
                class="btn btn-thirdColor px-xl-5 text-white"
                aria-label="Valider votre formulaire"
              >
                Valider
              </button>
            </div>
            <div v-if="error" class="alert alert-danger mt-3 text-center">
              {{ error }}
            </div>
          </form>
        </div>
      </div>
      <div class="bg-thirdColor text-white text-center py-3 rounded-bottom">
        Vous êtes déjà inscrit,
        <RouterLink to="authentification" class="text-white"
          >connectez vous</RouterLink
        >
      </div>
    </div>
  </div>
</template>
<style></style>
