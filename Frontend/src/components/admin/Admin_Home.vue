<script>
import NavBar from "../navbar.vue";
import AdminUser from "./Admin_User.vue";
import AdminPost from "./Admin_Post.vue";
import { mapGetters } from "vuex";
import { usersServices } from "../../_services";
export default {
  name: "ADMINISTRATOR",
  components: { NavBar, AdminUser, AdminPost },
  computed: {
    ...mapGetters(["user"]),
  },
  async mounted() {
    usersServices
      .getAllProfiles()
      .then((response) => {
        this.$store.dispatch("user", response.data.data);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  },
};
</script>
<template>
  <div>
    <NavBar />
  </div>
  <div class="container my-3 pt-2 px-0 pb-1">
    <ul class="nav nav-tabs" id="myTab" role="tablist">
      <li class="nav-item" role="Gestion des utilisateurs">
        <button
          class="nav-link text-thirdColor"
          id="profile-tab"
          data-bs-toggle="tab"
          data-bs-target="#profile"
          type="button"
          role="tab"
          aria-controls="Utilisateurs"
          aria-selected="false"
        >
          Utilisateurs
        </button>
      </li>
      <li class="nav-item" role="Liste des utilisateurs">
        <button
          class="nav-link text-thirdColor"
          id="posts-tab"
          data-bs-toggle="tab"
          data-bs-target="#posts"
          type="button"
          role="tab"
          aria-controls="Articles"
          aria-selected="false"
        >
          Articles
        </button>
      </li>
    </ul>
    <div class="tab-content" id="myTabContent">
      <div
        class="tab-pane fade show active"
        id="profile"
        role="Gestion des utilisateurs"
      >
        <AdminUser />
      </div>
      <div class="tab-pane fade" id="posts" role="Gestion des articles">
        <AdminPost />
      </div>
    </div>
  </div>
</template>
<style></style>
