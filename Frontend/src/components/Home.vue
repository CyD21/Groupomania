<script>
import { usersServices, postsServices } from "../../src/_services";
import { mapGetters } from "vuex";
import Navbar from "./navbar.vue";
import editPost from "./posts/Edit_Post.vue"
import Comments from "./posts/All_Comments.vue";
import EditComment from "./posts/Edit_Comment.vue";
import imagePost from "../../src/components/posts/Image_Modal.vue";
import Likes from "./posts/Post_Likes.vue";
import deletePost from "./posts/Delete_Post.vue";
import blockPost from "./posts/Block_Post.vue";
import modifyPost from "./posts/Modify_Post.vue";
export default {
  name: "Home_Page",
  components: {
    Navbar,
    editPost,
    Likes,
    imagePost,
    modifyPost,
    deletePost,
    blockPost,
    EditComment,
    Comments,
  },
  data() {
    return {
      open: false,
    };
  },
  computed: {
    ...mapGetters(["user"]),
    ...mapGetters(["posts"]),
    ...mapGetters(["formatDate"]),
  },
  async mounted() {
    const responseUser = await usersServices.getProfile();
    this.$store.dispatch("user", responseUser.data);
    const responsePosts = await postsServices.getAllPosts();
    this.$store.dispatch("posts", responsePosts.data);
  },
};
</script>
<template>
  <header>
    <Navbar />
  </header>
  <editPost />
  <div>
    <div
      class="container col-11 col-md-10 col-xl-6 shadow-lg p-0 mt-3 mb-5"
      v-for="(post, id) in posts"
      :key="id"
    >
      <div v-if="post.status === false" class="card text-center">
        <div class="card-header bg-thirdColor text-white">
          <div class="col-12 d-flex justify-content-between">
            <div>
              <img
                class="img imgProfilPosts"
                :src="post.User.profilePicture"
                alt="Image de profil du post"
              />
            </div>
            <div class="d-flex flex-column justify-content-center">
              <div class="text-end fw-lighter">
                Editer par : {{ post.User.firstName }} {{ post.User.lastName }}
              </div>
              <div class="text-end fw-light">
                le {{ formatDate(post.createdAt) }}
              </div>
            </div>
          </div>
        </div>
        <div>
          <article class="card-body justifyText">
            <imagePost :post="post" />
            <p class="card-text text-start bg-light rounded p-3">
              {{ post.description }}
            </p>
          </article>
          <div
            class="card-footer d-flex flex-column flex-md-row justify-content-between align-items-center border-bottom"
          >
            <div>
              <span class="pe-2">
                <i class="fa fa-comment" aria-hidden="true"></i>
              </span>
              <span class="pe-2">{{ post.comments.length }}</span>
              <span v-if="post.comments.length <= 1">Commentaire</span>
              <span v-if="post.comments.length > 1">Commentaires</span>
            </div>
            <div class="d-flex justify-content-center align-items-center">
              <div>{{ post.like }}</div>
              <div>
                <Likes :postid="post.id" />
              </div>
              <div>
                <modifyPost :postid="post" v-if="user.id === post.UserId" />
              </div>
              <div class="d-flex">
                <deletePost
                  :postid="post"
                  v-if="
                    user.isAdmin === 'Administrateur' || user.id === post.UserId
                  "
                />
              </div>
              <div>
                <blockPost
                  :blockid="post.id"
                  v-if="
                    user.isAdmin === 'Administrateur' ||
                    user.isAdmin === 'Modérateur'
                  "
                />
              </div>
            </div>
          </div>
          <div>
            <Comments :userid="user.id" :postComments="post.comments" />
          </div>
          <div>
            <EditComment :postid="post.id" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style></style>
