<template>
  <Navbar :user="user"/>
  <Welcome :user="user"/>
</template>
<script>
import axios from "axios";
import Navbar from "./navbar.vue";
import Welcome from "./welcome.vue";
export default {
  name: "Home",
  components: { Navbar, Welcome },
  data() {
    return {
      user: null,
    };
  },
  async created() {
    const response = await axios.get("/user/Profile");
    this.user = response.data;
  },
};
</script>
<style></style>
