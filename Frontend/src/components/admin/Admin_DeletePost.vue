<script>
import { postsServices } from "../../_services";
export default {
  name: "DELETEPOST",
  props: ["postid"],
  methods: {
    destroyPost() {
      const id = this.postid;
      postsServices
        .deletePost(id)
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
    <button class="btn" aria-label="Supprimer l'article" type="button" @click="destroyPost">
      <i class="fa fa-trash icoColorsRed" aria-hidden="false"></i>
    </button>
  </div>
</template>
<style></style>
