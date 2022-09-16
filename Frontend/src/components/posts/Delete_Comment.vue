<script>
import { commentsServices, postsServices } from "../../_services";
export default {
  name: "Delete_Comments",
  props: ["commentId"],
  methods: {
    destroyComments() {
      const id = this.commentId;
      commentsServices
        .deleteComments(id)
        .then(() => {
          postsServices.getAllPosts().then((response) => {
            this.$store.commit("posts", response.data);
          });
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
    <button class="btn text-danger" aria-label="Bouton supprimer le commentaire">
      <i class="fa fa-trash" aria-hidden="false" aria-label="Supprimer le commentaire" @click="destroyComments"></i>
    </button>
  </div>
</template>

<style></style>
