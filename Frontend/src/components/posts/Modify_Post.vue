<script>
import { ref } from "vue";
import { mapGetters } from "vuex";
import { postsServices } from "../../_services";
import Modal from "../Modal/Modal.vue";
import Swal from "sweetalert2";
export default {
  name: "Modify_Post",
  data() {
    return {
      error: "",
      modifyDescription: "",
    };
  },
  components: { Modal },
  props: ["postid"],
  computed: {
    ...mapGetters(["user"]),
    ...mapGetters(["formatDate"]),
  },
  setup() {
    const isOpen = ref(false);
    return { isOpen };
  },
  methods: {
    openModal() {
      this.modifyDescription = this.postid.description;
      this.isOpen = true;
    },
    changePost() {
      const id = this.postid.id;
      postsServices
        .modifyPost(id, {
          description: this.modifyDescription,
        })
        .then((response) => {
          postsServices.getAllPosts().then((response) => {
            this.$store.commit("posts", response.data);
            this.isOpen = false;
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Votre article a été modifié avec succés",
              showConfirmButton: false,
              timer: 1500,
            });
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
  <button
    class="btn"
    @click="openModal()"
    aria-label="Bouton modifier l'article"
  >
    <i class="fa fa-pencil" aria-hidden="false"></i>
  </button>
  <Modal :open="isOpen" @close="isOpen = !isOpen">
    <div>
      <div class="card-header bg-thirdColor text-white">
        <div class="col-12 d-flex justify-content-between">
          <div>
            <img
              class="img imgProfilPosts"
              :src="user.profilePicture"
              alt="Image de profil"
            />
          </div>
          <div class="d-flex flex-column justify-content-center">
            <div class="text-end fw-lighter">
              En cours de modification par : {{ user.firstName }}
              {{ user.lastName }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <form @submit.prevent="changePost()">
      <label class="mt-3 text-start">Modification de votre Article</label>
      <textarea
        type="text"
        class="form-control col-12 mt-1"
        rows="10"
        minlength="100"
        v-model="modifyDescription"
        aria-label="Modification de l'article"
        role="textbox"
        aria-multiline="true"
        required
      ></textarea>
      <div
        aria-label="L'article doit contenir au minimum 100 caractères"
        class="alert alert-danger mt-3 border-danger"
        v-if="this.modifyDescription.length < 100"
      >
        La description doit contenir au minimum 100 caractères
      </div>
      <button
        class="btn btn-thirdColor text-white my-3"
        type="submit"
        aria-label="Valider la modification"
        @click="isOpen = false"
        v-if="this.modifyDescription.length >= 100"
      >
        Modifier
      </button>
    </form>
  </Modal>
</template>
<style></style>
