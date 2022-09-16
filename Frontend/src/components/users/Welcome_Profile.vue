<script>
import { usersServices } from "../../_services";
import { mapGetters } from "vuex";
export default {
  name: "Welcome_Profile",
  computed: {
    ...mapGetters(["user"]),
  },
  async mounted() {
    const response = await usersServices.getProfile();
    this.$store.dispatch("user", response.data);
  },
};
</script>
<template>
  <div class="card mb-3 bg-thirdColor text-white fw-lighter shadow">
    <div class="d-flex-column d-md-flex">
      <div class="p-2 p-md-0 d-flex justify-content-center align-items-center">
        <img
          :src="user.profilePicture"
          class="img-fluid rounded imgProfil ps-md-3 p-xl-0"
          alt="Photo de profil de l'utilisateur"
        />
      </div>
      <div class="d-flex justify-content-center align-items-center">
        <div class="card-body">
          <div class="card-title">
            Bonjour, <strong>{{ user.firstName }}</strong> bienvenue sur votre
            profil Groupomania.
          </div>
          <p class="card-text">
            Vous disposez d'un compte {{ user.isAdmin }} , partager vos idées,
            vos envies, avec l'ensemble de l'équipe.
          </p>
          <p class="card-text">
            <small class="text-light fst-italic"
              >Votre session prendra fin automatiquement dans 1 heure, passer ce
              délais vous devez vous reconnecter.</small
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<style></style>
