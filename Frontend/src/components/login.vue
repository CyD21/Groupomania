<template>
  <div class="container bg-firstColor mt-5 col-xl-3 col-md-6 col-10 p-0 d-flex d-flex flex-column rounded shadow-lg">
    <div class="align-self-center rounded-top m-0 m-md-0">
      <Logo />
    </div>
    <div class="p-4 bg-light">
      <div class="text-center text-white fw-lighter rounded fs-4 bg-thirdColor py-2 mb-5">
        Connexion
      </div>
      <div>
        <form @submit.prevent="UserLogin">
          <div class="mb-3">
            <div class="d-flex justify-content-center aligns-items-center border-bottom">
              <i class="fa-solid fa-envelope p-2"></i>
              <input type="email" placeholder="Votre adresse email" class="form-control text-dark border-0 bg-light"
                v-model="email" id="email" />
            </div>
          </div>
          <div class="mb-3">
            <div class="d-flex justify-content-center aligns-items-center border-bottom">
              <i class="fa fa-key p-2" aria-hidden="true"></i>
              <input type="password" placeholder="Votre mot de passe" class="form-control text-dark border-0 bg-light"
                v-model="password" id="password" />
            </div>
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-thirdColor px-xl-5 text-white mt-5 fs-4 fw-lighter">
              Valider
            </button>
          </div>
        </form>
        <div class="alert alert-danger mt-3 text-center" v-if="error">{{ error }}</div>
      </div>
    </div>
    <div class="bg-light text-center py-3 m-0 rounded-bottom">
      Vous n'avez pas encore de compte,
      <RouterLink to="register">cliquez-ici</RouterLink>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Logo from "./logo.vue";
export default {
  name: "LoginUser",
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    UserLogin() {
      axios
        .post("user/login", {
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          localStorage.setItem("token", res.data.TOKEN);
          this.$store.dispatch("user", res.data.user);
          console.log(res.data.user);
          this.$router.push("/profile");
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
    },
  },
  components: { Logo },
};
</script>

<style>
</style>
