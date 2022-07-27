<template>
  <div class="card mb-3 col-11 col-xl-6 col-md-10 mx-auto mt-3 px-2 px-md-0 bg-thirdColor text-white fw-lighter shadow">
    <div class="row g-0">
      <div class="col-md-3 d-flex justify-content-center justify-content-xl-start align-items-center">
        <img crossorigin="anonymous" src="../assets/images/profilePicture_1658500112453.jpeg" class="img-thumbnail rounded mt-3 mt-md-0 p-md-2 p-xl-0 imgProfil" alt="..." />
      </div>
      <div class="col-md-9 d-flex justify-content-center align-items-center">
        <div class="card-body p-md-0 ms-md-2">
          <div class="card-title" v-if="user">
            Bonjour, <strong>{{ user.firstName }}</strong> bienvenue sur votre profil Groupomania.
          </div>
          <div class="card-title" v-if="!user">Bonjour, Merci de bien vouloir vous connecter pour accéder à votre profil.</div>
          <p class="card-text">Vous disposez d'un compte {{ user.isAdmin }} , partager vos idées, vos envies, avec l'ensemble de l'équipe.</p>
          <p class="card-text">
            <small class="text-light fst-italic">Votre session prendra fin automatiquement dans 1 heure, passer ce délais vous devez vous reconnecter.</small>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  name: "Welcome",
  computed: {
    ...mapGetters(["user"]),
  },
  async mounted() {
    const response = await axios.get("user/profile");
    this.$store.dispatch("user", response.data);
  },
};
</script>
<style></style>
