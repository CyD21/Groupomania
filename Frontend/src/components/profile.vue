<template>
  <div>
    <Navbar />
  </div>
  <div>
    <Welcome />
  </div>
  <div class="container p-0 col-xl-6 bg-light mx-auto mt-4 rounded shadow">
    <div class="bg-firstColor text-white ps-4 py-2 fs-4 rounded-top">
      Gestion de votre compte
    </div>
    <div class="p-4">
      <userProfile />
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Navbar from "./navbar.vue";
import Welcome from "./welcome.vue";
import userProfile from "./userProfile.vue";
export default {
  name: "Home",
  components: { Navbar, Welcome, userProfile },
  async mounted() {
    const response = await axios.get("user/profile");
    this.$store.dispatch("user", response.data);
  },
};
</script>
<style></style>
