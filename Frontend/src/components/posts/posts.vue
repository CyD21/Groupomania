<template>
  <div class="container col-6 mt-5 shadow-lg p-0">
    <div class="card text-center">
      <div class="card-header bg-thirdColor text-white">Ici entête pour les posts</div>
      <img
        class="card-img-top imgPosts"
        src="https://www.okvoyage.com/wp-content/uploads/2021/08/paysages-de-france-scaled.jpg"
        alt="..."
      />
      <div class="card-body">
        <h5 class="card-title text-start ps-2">Ici titre du post</h5>
        <p class="card-text text-start bg-light rounded p-3">Ici text du post</p>
      </div>
      <div class="card-footer d-flex justify-content-between">
        <div><Comments /></div>
        <div><Likes /></div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Comments from "./comments.vue";
import Likes from "./likes.vue";
export default {
  name: "comments",
  components: { Comments, Likes },
  computed: {
    ...mapGetters(["users"])
  },
}
</script>
<style></style>
