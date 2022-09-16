<script>
import { mapGetters } from "vuex";
import { postsServices } from "../../_services";
export default {
  name: "ADMIN_BLOCKPOST",
  props: ["postid"],
  computed: {
    ...mapGetters(["posts"]),
  },
  methods: {
    Lock() {
      const id = this.postid;
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
    <button class="btn" type="button" @click="Lock" aria-label="Vérouiller l'article">
      <i class="fa fa-unlock text-success" aria-hidden="false"></i>
    </button>
  </div>
</template>
<style></style>
