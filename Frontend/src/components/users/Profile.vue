<script>
import { usersServices } from "../../_services";
import Navbar from "../Navbar.vue";
import userProfile from "./User_Profile.vue";
export default {
  name: "User_Profile",
  components: { Navbar, userProfile },
  async mounted() {
    const response = await usersServices.getProfile();
    this.$store.dispatch("user", response.data);
  },
};
</script>
<template>
  <div>
    <Navbar />
  </div>
  <div
    class="container p-0 mt-md-3 mt-md-5 col-12 col-md-10 col-xl-6 bg-light shadow"
  >
    <div
      class="bg-thirdColor bg-md-firstcolor text-center text-white ps-4 py-2 fs-4 rounded-md-top"
    >
      <h1 class="fs-3">Gestion de votre compte</h1>
    </div>
    <div class="p-4">
      <userProfile />
    </div>
  </div>
</template>

<style></style>
