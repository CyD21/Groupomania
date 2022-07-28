<template>
  <form @submit.prevent="passwordSubmit">
    <div class="input-group mb-3">
      <span class="input-group-text" id="basic-addon1"
        ><i class="fa fa-key" aria-hidden="true"></i
      ></span>
      <input
        v-model="oldPassword"
        placeholder="Votre mot de passe actuel"
        type="password"
        class="form-control"
        aria-label="email"
        aria-describedby="basic-addon1"
      />
    </div>
    <div class="input-group mb-3">
      <span class="input-group-text" id="basic-addon1"
        ><i class="fa fa-key" aria-hidden="true"></i
      ></span>
      <input
        v-model="user.password"
        placeholder="Votre nouveau mot de passe"
        type="password"
        class="form-control"
        aria-label="email"
        aria-describedby="basic-addon1"
      />
    </div>
    <div class="input-group mb-3">
      <span class="input-group-text" id="basic-addon1"
        ><i class="fa fa-key" aria-hidden="true"></i
      ></span>
      <input
        v-model="confirmPassword"
        placeholder="Confirmation du nouveau mot de passe"
        type="password"
        class="form-control"
        aria-label="email"
        aria-describedby="basic-addon1"
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
  <div v-if="msg" class="alert alert-success mt-3 text-center">{{ msg }}</div>
</template>
<script>
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  name: "updatePasswordUser",
  data() {
    return {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      error: "",
      msg: "",
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    passwordSubmit() {
      axios
        .put("user/updatePwd", {
          oldPassword: this.oldPassword,
          newPassword: this.user.password,
          confirmPassword: this.confirmPassword,
        })
        .then(() => {
          this.msg =
            "La modification de votre mot de passe a bien été prise en compte";
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
    },
  },
};
</script>
<style></style>
