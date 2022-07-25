<template>
  <div class="container bg-firstColor mt-5 col-xl-4 col-md-6 col-10 p-0 d-flex d-flex flex-column rounded shadow-lg">
    <div class="align-self-center rounded-top">
      <img class="img-fluid px-4" src="../assets/images/logo.png" alt="logo" />
    </div>
    <div class="p-4 bg-light">
      <div>
        <form @submit.prevent="UserSubmit">
          <div class="mb-3">
            <label for="name" class="form-label">Votre Prénom</label>
            <input type="text" class="form-control" v-model="dataUser.firstName" id="firstName" />
          </div>
          <div class="mb-3">
            <label for="name" class="form-label">Votre nom</label>
            <input type="text" class="form-control" v-model="dataUser.lastName" id="lastName" />
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Votre adresse email</label>
            <input type="email" class="form-control" v-model="dataUser.email" id="email" aria-describedby="emailHelp" />
            <div id="emailHelp" class="form-text">
              Nous ne partagerons jamais votre e-mail.
            </div>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Votre mot de passe</label>
            <input type="password" class="form-control" v-model="dataUser.password" id="password" />
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-thirdColor px-xl-5 text-white">
              Valider
            </button>
          </div>
          <div v-if="error" class="alert alert-danger mt-3 text-center">{{ error }}</div>
        </form>
      </div>
    </div>
    <div class="bg-light text-center py-3 rounded-bottom">
      Vous êtes déjà inscrit,
      <RouterLink to="login">connectez vous</RouterLink>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "Register",
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
    UserSubmit() {
      axios
        .post("user/add", {
          firstName: this.dataUser.firstName,
          lastName: this.dataUser.lastName,
          email: this.dataUser.email,
          password: this.dataUser.password,
        })
        .then((user) => {
          this.UserLogin(this.dataUser.email, this.dataUser.password)
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
    },
    UserLogin(email, password) {
      axios
        .post("user/login", {
          email: email,
          password: password,
        })
        .then((res) => {
          localStorage.setItem("token", res.data.TOKEN);
          this.$store.dispatch("user", res.data.user);
          this.$router.push("/profile");
        })
        .catch((error) => {
          this.error =
            "Erreur de connexion, veuillez vérifier les informations";
        });
    },
  },
};
</script>

<style>
</style>
