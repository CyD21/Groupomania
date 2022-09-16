<script>
import { mapGetters } from "vuex";
import { postsServices } from "../../_services";
export default {
  name: "ADMIN_UNLOCKPOST",
  props: ["postid"],
  computed: {
    ...mapGetters(["posts"]),
  },
  methods: {
    unLock() {
      const id = this.postid;
      console.log(id);
      postsServices
        .unBlockPost(id)
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
    <button class="btn" aria-label="Dévérouiller l'article" type="button" @click="unLock">
      <i class="fa fa-lock text-danger" aria-hidden="false"></i>
    </button>
  </div>
</template>
<style></style>
