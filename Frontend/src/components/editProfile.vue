<template>
  <form @submit.prevent="profilSubmit">
    <div class="input-group mb-3">
      <span class="input-group-text">
        <i class="fa fa-user" aria-hidden="true"></i>
      </span>
      <input
        v-model="user.firstName"
        :placeholder="user.firstName"
        type="text"
        aria-label="First name"
        class="form-control"
      />
      <input
        v-model="user.lastName"
        :placeholder="user.lastName"
        type="text"
        aria-label="Last name"
        class="form-control"
      />
    </div>
    <div class="input-group mb-3">
      <span class="input-group-text" id="basic-addon1">
        <i class="fa fa-envelope" aria-hidden="true"></i>
      </span>
      <input
        v-model="user.email"
        :placeholder="user.email"
        type="email"
        class="form-control"
        aria-label="email"
        aria-describedby="basic-addon1"
      />
    </div>
    <div class="input-group mb-3">
      <span class="input-group-text" id="basic-addon1">
        <i class="fa fa-people-group" aria-hidden="true"></i>
      </span>
      <input
        v-model="user.occupation"
        :placeholder="user.occupation"
        type="Text"
        class="form-control"
        aria-label="occupation"
        aria-describedby="basic-addon1"
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
<script>
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  name: "editProfil",
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
      formData.append("profilePicture", this.$refs.file.files[0]);
      axios
        .put("user/editProfile", formData, {
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          email: this.user.email,
          occupation: this.user.occupation,
        })
        .then(() => {
          this.msg = "La modification de vos informations est prise en compte";
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
    },
    selectFile(e) {
      const file = this.$refs.file.files[0];
      this.file = file;
      console.log(this.file.name);
      //
      let input = e.target;
      if (input.files) {
        let reader = new FileReader();
        console.log("reader", reader);
        reader.onload = (e) => {
          console.log("  reader.onload", reader);
          this.profilePicture = e.target.result;
          console.log("this.profilePicture", this.profilePicture);
        };
        reader.readAsDataURL(input.files[0]);
      }
    },
  },
};
</script>
<style></style>
