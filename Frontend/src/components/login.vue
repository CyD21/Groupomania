<template>
  <div
    class="container bg-firstColor mt-5 col-xl-4 col-md-6 col-10 p-0 d-flex d-flex flex-column rounded shadow-lg"
  >
    <div class="align-self-center rounded-top">
      <Logo />
    </div>
    <div class="p-4 bg-light">
      <div>
        <form @submit.prevent="UserLogin">
          <div class="mb-3">
            <label for="email" class="form-label"
              >Saissisez votre adresse email</label
            >
            <input
              type="email"
              class="form-control"
              v-model="email"
              id="email"
            />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label"
              >Entrez votre mot de passe</label
            >
            <input
              type="password"
              class="form-control"
              v-model="password"
              id="password"
            />
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-thirdColor px-xl-5 text-white">
              Valider
            </button>
          </div>
        </form>
        <div class="alert alert-danger mt-3" v-if="error">{{ error }}</div>
      </div>
    </div>
    <div class="bg-light text-center py-3 rounded-bottom">
      Vous n'avez pas encore de compte,
      <RouterLink to="register">cliquez-ici</RouterLink>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Logo from "./logo.vue";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async UserLogin() {
      try {
        const response = await axios.post("user/login", {
          email: this.email,
          password: this.password,
        });
        localStorage.setItem("TOKEN", response.data.TOKEN);
        this.$router.push("/home");
      } catch (error) {
        this.error = "Erreur de connexion, veuillez contrôler votre adresse email et votre mot de passe";
      }
    },
  },
  components: { Logo },
};
</script>

<style></style>
