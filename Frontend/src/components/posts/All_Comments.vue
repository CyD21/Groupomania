<script>
import { mapGetters } from "vuex";
import deleteComment from "./Delete_Comment.vue";
export default {
  name: "All_Comments",
  components: { deleteComment },
  data() {
    return {
      open: false,
    };
  },
  props: ["postComments"],
  computed: {
    ...mapGetters(["user"]),
  },
};
</script>
<template>
  <div
    class="d-flex flex-column border-bottom justify-content-center align-items-start"
  >
    <div class="bg-thirdColor col-12 text-start">
      <a
        type="button"
        class="btn text-white"
        v-if="postComments != ''"
        @click="open = !open"
        >Voir les commentaires ...</a
      >
    </div>
    <Transition name="slide-fade" mode="in-out">
      <div class="m-2" v-show="open">
        <div>
          <div
            v-for="comments in postComments"
            :key="comments.id"
            class="d-flex flex-column justify-content-center align-items-start px-2"
          >
            <div class="d-flex flex-column align-items-start">
              <span class="fst-italic pt-2 text-start">
                {{ comments.User.firstName }}
              </span>
              <div class="d-flex">
                <deleteComment
                  :commentId="comments.id"
                  v-if="comments.UserId === user.id"
                />
                <span class="fw-light mt-2 text-start">
                  {{ comments.content }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
<style></style>
