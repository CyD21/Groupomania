<script>
import { postsServices } from "../../_services";
export default {
  name: "Bloc_Post",
  props: ["blockid"],
  methods: {
    lockPost() {
      const id = this.blockid;
      console.log(id);
      postsServices
        .blockPost(id)
        .then((response) => {
          postsServices.getAllPosts().then((response) => {
            this.$store.commit("posts", response.data);
          });
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
<template>
  <div>
    <button class="btn" type="submit" @click="lockPost()" aria-label="Bouton bloquer l'article">
      <i class="fa fa-lock icoColorsRed" aria-hidden="false"></i>
    </button>
  </div>
</template>
<style></style>
