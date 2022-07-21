<template>
  <div>
    <Navbar />
  </div>
  <div>
    <Welcome />
  </div>
</template>
<script>
import axios from "axios";
import Navbar from "./navbar.vue";
import Welcome from "./welcome.vue";
export default {
  name: "Home",
  components: { Navbar, Welcome },
  async mounted() {
    const response = await axios.get("user/profile");
    this.$store.dispatch("user", response.data);
  },
};
</script>
<style></style>
