<script>
import { commentsServices, postsServices } from "../../_services";
import { mapGetters } from "vuex";
export default {
  name: "EDITCOMMENT",
  data() {
    return {
      content: "",
      error: "",
    };
  },
  props: ["postid"],
  computed: {
    ...mapGetters(["posts"]),
    ...mapGetters(["comments"]),
  },
  methods: {
    editComment() {
      console.log(this.content);
      const id = this.postid;
      const dataComments = {
        content: this.content,
      };
      console.log(this.content);
      commentsServices
        .createComment(id, dataComments)
        .then(() => {
          postsServices.getAllPosts().then((response) => {
            this.$store.commit("posts", response.data);
            this.content = ""
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
  <form @submit.prevent="editComment">
    <div
      class="form-floating d-flex justify-content-center align-items-center p-2 m-0"
    >
      <input
        type="text"
        v-model="content"
        class="form-control"
        aria-label="Insérer votre commentaire"
        maxlength="500"
        required
      />
      <label>Poster un commentaire</label>
      <span class="ps-4">
        <button
          type="submit"
          class="btn btn-firstColor"
          aria-label="Bouton poster votre commentaire"
        >
          <i
            class="fa fa-arrow-circle-right text-white"
            aria-label="Icone poster"
          ></i>
        </button>
      </span>
    </div>
    <span
      class="text-danger ps-2 pb-2 d-flex justify-content-start"
      >{{ error }}</span
    >
  </form>
</template>
<style></style>
