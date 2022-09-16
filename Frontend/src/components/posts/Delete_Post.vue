<script>
import { postsServices } from "../../_services";
export default {
  name: "DELETEPOST",
  props: ["postid"],
  methods: {
    destroyPost() {
      const id = this.postid.id;
      console.log(id);
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
    <form @submit.prevent="destroyPost()">
      <button
        class="btn"
        type="submit"
        aria-label="Bouton suppression de l'article"
      >
        <i class="fa fa-trash icoColorsRed" aria-hidden="false"></i>
      </button>
    </form>
  </div>
</template>

<style></style>
