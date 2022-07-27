<template>
  <div>
    <Navbar />
  </div>
  <div>
    <Posts />
  </div>
</template>
<script>
import axios from "axios";
import { mapGetters } from "vuex";
import Navbar from "./navbar.vue";
import Posts from "./posts/posts.vue";
export default {
  name: "Home",
  components: { Navbar, Posts },
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
