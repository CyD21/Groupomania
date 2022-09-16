<script>
import { mapGetters } from "vuex";
import { postsServices } from "../../_services";
import DeletePost from "../admin/Admin_DeletePost.vue";
import LockPost from "./Admin_LockPost.vue";
import UnLockPost from "./Admin_UnLockPost.vue";
export default {
  name: "ADMIN_POST",
  components: { DeletePost, LockPost, UnLockPost },
  computed: {
    ...mapGetters(["user", "posts", "formatDate"]),
  },
  async created() {
    const response = await postsServices.getAllPosts();
    this.$store.dispatch("posts", response.data);
    // console.table(response.data);
  },
};
</script>
<template>
  <div class="container">
    <div class="container d-none d-md-block">
      <div class="d-flex p-2 bg-light fw-bold">
        <div class="col-1 text-center">Id</div>
        <div class="col-5">Utilisateur</div>
        <div class="col-4">Date de Création</div>
        <div class="col-1 text-center">Status</div>
        <div class="col-1 text-center">Supprimer</div>
      </div>
    </div>
    <div class="container" v-for="(post, id) in posts" :key="id">
      <div class="d-flex p-2 border-bottom align-items-center">
        <div class="col-2 col-md-1 text-center fw-bold">{{ post.id }}</div>
        <div class="col-8 col-md-5">
          {{ post.User.lastName }} {{ post.User.firstName }}
        </div>
        <div class="col-4 d-none d-md-block">
          {{ formatDate(post.createdAt) }}
        </div>
        <div class="col-1 text-center">
          <UnLockPost :postid="post.id" v-if="post.status === true" />
          <LockPost :postid="post.id" v-if="post.status === false" />
        </div>
        <div class="col-1 text-center">
          <DeletePost :postid="post.id" />
        </div>
      </div>
    </div>
  </div>
</template>
<style></style>
