<template>
  <div>
    <Navbar />
  </div>
</template>
<script>
import axios from "axios";
import Navbar from "./navbar.vue";
export default {
  name: "Home",
  components: { Navbar },
  async mounted() {
    const response = await axios.get("user/profile");
    this.$store.dispatch("user", response.data);
  },
};
</script>
<style></style>
