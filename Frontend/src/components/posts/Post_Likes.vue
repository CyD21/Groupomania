<script>
import { likesServices, postsServices } from "../../_services";
export default {
  name: "Post_Likes",
  props: ["postid"],
  methods: {
    likeOrNot() {
      const id = this.postid;
      console.log(id);
      likesServices
        .likeOrNot(id)
        .then((response) => {
          postsServices.getAllPosts().then((response) => {
            this.$store.commit("posts", response.data);
          });
          console.log(response.data);
        })
        .catch((error) => {
          this.error = error.response;
          console.log(error);
        });
    },
  },
};
</script>
<template>
  <div class="d-flex justify-content-center align-items-center">
    <div class=""></div>
    <div>
      <button type="button" class="btn" @click="likeOrNot" aria-label="Bouton like article">
        <i class="fa fa-thumbs-up icoColorsGreen" aria-hidden="false"></i>
      </button>
    </div>
  </div>
</template>
<style></style>
