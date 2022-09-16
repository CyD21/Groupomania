<script>
import { mapGetters } from "vuex";
import { ref } from "vue";
import Modal from "../../components/Modal/Modal.vue";
export default {
  name: "Image_Post",
  props: ["post"],
  components: { Modal },
  computed: {
    ...mapGetters(["posts"]),
  },
  setup() {
    const isOpen = ref(false);
    return { isOpen };
  },
};
</script>
<template>
  <div>
    <button class="btn col-12">
      <img
        class="card-img-top imgPosts"
        :src="post.image"
        alt="image du post"
        @click="isOpen = true"
      />
    </button>
  </div>
  <Modal :open="isOpen" @close="isOpen = !isOpen">
    <div class="container col-12 scale-up-center">
      <img class="imgPostModal" :src="post.image" alt="image du post" />
    </div>
  </Modal>
</template>
