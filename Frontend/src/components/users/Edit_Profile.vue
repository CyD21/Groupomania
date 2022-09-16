<script>
import { usersServices } from "../../_services";
import { mapGetters } from "vuex";
export default {
  name: "Edit_Profile",
  data() {
    return {
      error: "",
      msg: "",
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    profilSubmit() {
      const formData = new FormData();
      formData.append("firstName", this.user.firstName);
      formData.append("lastName", this.user.lastName);
      formData.append("email", this.user.email);
      formData.append("occupation", this.user.occupation);
      formData.append("profilePicture", this.$refs.file.files[0]);
      usersServices
        .updateProfile(formData, {
          profil: this.user.profil,
        })
        .then((res) => {
          this.msg = "La modification de vos informations est prise en compte";
          console.log(res.data.data);
          this.$store.commit("user", res.data.data);
        })
        .catch((error) => {
          this.error = error.response.data;
        });
    },
    selectFile(e) {
      let input = e.target;
      if (input.files) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.profilePicture = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    },
  },
};
</script>
<template>
  <form @submit.prevent="profilSubmit()">
    <div class="input-group mb-3">
      <span class="input-group-text">
        <i class="fa fa-user" aria-hidden="true" aria-label="Icone nom et prénom"></i>
      </span>
      <input
        id="firstName"
        v-model="user.firstName"
        :placeholder="user.firstName"
        type="text"
        aria-label="Votre prénom"
        class="form-control"
      />
      <input
        id="lastName"
        v-model="user.lastName"
        :placeholder="user.lastName"
        type="text"
        aria-label="Votre Nom de famille"
        class="form-control"
      />
    </div>
    <div class="input-group mb-3">
      <span class="input-group-text" id="basic-addon1">
        <i class="fa fa-envelope" aria-hidden="true" aria-label="Icone email"></i>
      </span>
      <input
        id="email"
        v-model="user.email"
        :placeholder="user.email"
        type="email"
        class="form-control"
        aria-label="Adresse email"
      />
    </div>
    <div class="input-group mb-3">
      <span class="input-group-text" id="basic-addon1">
        <i class="fa fa-people-group" aria-hidden="true" aria-label="Icone poste de travail"></i>
      </span>
      <input
        id="occupation"
        v-model="user.occupation"
        :placeholder="user.occupation"
        type="Text"
        class="form-control"
        aria-label="Poste occupé dans l'entreprise"
      />
    </div>
    <div class="input-group mb-3">
      <input
        @change="selectFile"
        id="pictureProfile"
        type="file"
        ref="file"
        name="file"
        accept=".jpg, .jpeg, .png"
        class="form-control"
        aria-label="Sélectionner un fichier"
      />
    </div>
    <div class="text-center">
      <button type="submit" class="btn btn-thirdColor px-xl-5 text-white">
        Enregister les modifications
      </button>
    </div>
  </form>
  <div v-if="error" class="alert alert-danger mt-3 text-center">
    {{ error }}
  </div>
  <div v-if="msg" class="alert alert-success mt-3 text-center">
    {{ msg }}
  </div>
</template>
<style></style>
