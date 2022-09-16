<script>
import { ref } from "vue";
import { mapGetters } from "vuex";
import { usersServices, postsServices } from "../../_services";
import Modal from "../Modal/Modal.vue";
import Swal from "sweetalert2";
export default {
  name: "Edit_Post",
  components: { Modal },
  data() {
    return {
      description: "",
      confirm: false,
    };
  },
  setup() {
    const isOpen = ref(false);
    return { isOpen };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    editPost() {
      if (!this.$refs.file.files[0]) {
        this.error = "Veuillez insérer une image";
        console.log(this.error);
      } else {
        const formData = new FormData();
        formData.append("description", this.description);
        formData.append("image", this.$refs.file.files[0]);
        postsServices
          .createPost(formData)
          .then((response) => {
            postsServices.getAllPosts().then((response) => {
              this.$store.dispatch("posts", response.data);
              this.isOpen = false;
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Votre article a été publié avec succés",
                showConfirmButton: false,
                timer: 1500,
              });
            });
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error.response.data);
          });
      }
    },
    selectFile(e) {
      let input = e.target;
      if (input.files) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.image = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    },
  },
  async mounted() {
    const response = await usersServices.getProfile();
    this.$store.dispatch("user", response.data);
  },
};
</script>
<template>
  <div
    class="slade-fade container d-flex flex-column flex-md-row justify-content-between align-items-center p-2 p-xl-0 col-11 col-md-10 col-xl-6 my-3 rounded border scale-up-center"
  >
    <img
      class="imgEditPost rounded-start"
      :src="user.profilePicture"
      alt="Image de profil"
    />
    <div class="text-lighter text-center my-2">
      Bonjour {{ user.firstName }}, heureux de vous retrouver sur Groupomania
    </div>
    <button
      class="btn btn-thirdColor me-2 rounded-pill"
      arial-label="Poster un article"
      @click="isOpen = true"
    >
      Poster un article
    </button>
  </div>
  <Modal :open="isOpen" @close="isOpen = !isOpen">
    <div class="container col-12 rounded scale-up-center">
      <form id="edit" class="was-validated" @submit.prevent="editPost()">
        <div class="mt-3">
          <div>
            <input
              id="image"
              type="file"
              ref="file"
              name="file"
              class="form-control bg-light"
              accept=".jpg, .jpeg, .png"
              aria-label="exemple de fichier"
              required
            />
            <label class="text-start p-0 mb-3">
              L'insertion d'une image est obligatoire
            </label>
          </div>
          <textarea
            class="form-control bg-light col-12 p-3"
            id="validationTextarea"
            rows="8"
            v-model="description"
            minlength="100"
            aria-label="Texte de votre article"
            required
          ></textarea>
        </div>
        <label class="text-start mb-3 p-0">
          La description doit contenir au moins 100 caractères
        </label>
        <div
          class="form-check d-flex justify-content-center"
          v-if="description.length >= 100"
        >
          <input
            v-model="confirm"
            class="form-check-input"
            type="checkbox"
            aria-label="Checkbox de confirmation"
            @click="this.confirm == true"
            required
          />
          <label
            class="form-check-label ps-2 mb-3"
            aria-label="Confirmer l'envoie"
          >
            Confirmer l'envoie de cette article
          </label>
        </div>
        <div class="col-12 d-flex justify-content-center">
          <button
            type="submit"
            class="btn btn-thirdColor text-white mx-2 mb-4"
            v-if="this.confirm == true"
          >
            <div class="d-flex">
              <div>Envoyer</div>
              <div class="ps-2">
                <span
                  class="spinner-grow spinner-grow-sm me-1"
                  role="status"
                  aria-hidden="true"
                ></span>
                <span
                  class="spinner-grow spinner-grow-sm me-1"
                  role="status"
                  aria-hidden="true"
                ></span>
                <span
                  class="spinner-grow spinner-grow-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              </div>
            </div>
          </button>
        </div>
      </form>
    </div>
  </Modal>
</template>
<style></style>
