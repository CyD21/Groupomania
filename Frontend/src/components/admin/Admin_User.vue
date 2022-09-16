<script>
import { usersServices } from "../../_services";
import { mapGetters } from "vuex";
export default {
  name: "USER_ADMIN",
  computed: {
    ...mapGetters(["user", "formatDate"]),
  },
  methods: {
    destroyProfil() {
      usersServices
        .deleteProfile()
        .then((response) => {
          this.$store.commit("user", response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
<template>
  <div class="container mt-3 col-12 bg-light fw-bold d-none d-sm-block">
    <div class="d-flex justify-content-between align-items-center p-2">
      <div class="col-1"></div>
      <div class="col-3">Nom</div>
      <div class="col-2 d-none d-md-block">Poste</div>
      <div class="col-2 d-none d-md-block">Compte</div>
      <div class="col-3 d-none d-md-block">Inscrit depuis le ...</div>
      <div class="col-2 col-md-1 text-center">Contacter</div>
    </div>
  </div>
  <div class="container mt-3 col-12">
    <div
      class="container d-flex justify-content-between flex-md-row align-items-center p-2 border-top"
      v-for="allUsers in user"
      :key="allUsers.id"
    >
      <div class="col-2 col-md-1">
        <img
          class="imgListAdmin"
          :src="allUsers.profilePicture"
          alt="Photo de profil"
        />
      </div>
      <div class="col-7 col-md-3 ps-3">
        {{ allUsers.lastName }} {{ allUsers.firstName }}
      </div>
      <div class="col-2 d-none d-md-block">{{ allUsers.occupation }}</div>
      <div class="col-2 d-none d-md-block">{{ allUsers.isAdmin }}</div>
      <div class="col-3 d-none d-md-block">
        {{ formatDate(allUsers.createdAt) }}
      </div>
      <div class="col-2 col-md-1 fs-3 text-firstColor text-center">
        <a class="text-firstColor" :href="`mailto:` + allUsers.email" aria-label="Contacter l'utilisateur">
          <i class="fa fa-envelope" aria-hidden="false"></i>
        </a>
      </div>
    </div>
  </div>
</template>
<style></style>
