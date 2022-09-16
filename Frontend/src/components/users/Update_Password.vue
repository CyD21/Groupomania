<script>
import { mapGetters } from "vuex";
import { usersServices } from "../../_services";
export default {
  name: "Update_Password",
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
      usersServices
        .updatePassword()
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
<template>
  <form @submit.prevent="passwordSubmit">
    <div class="input-group mb-3">
      <span class="input-group-text" id="basic-addon1"
        ><i class="fa fa-key" aria-hidden="true"></i
      ></span>
      <input
        v-model="oldPassword"
        id="oldPassword"
        placeholder="Votre mot de passe actuel"
        type="password"
        class="form-control"
        aria-label="Saissisez votre ancien mot de passe"
      />
    </div>
    <div class="input-group mb-3">
      <span class="input-group-text" id="basic-addon1"
        ><i class="fa fa-key" aria-hidden="true"></i
      ></span>
      <input
        v-model="user.password"
        id="newPassword"
        placeholder="Votre nouveau mot de passe"
        type="password"
        class="form-control"
        aria-label="Saissisez de votre nouveau mot de passe"
      />
    </div>
    <div class="input-group mb-3">
      <span class="input-group-text" id="basic-addon1"
        ><i class="fa fa-key" aria-hidden="true"></i
      ></span>
      <input
        v-model="confirmPassword"
        id="confirmPassword"
        placeholder="Confirmation du nouveau mot de passe"
        type="password"
        class="form-control"
        aria-label="Confirmez votre nouveau mot de passe"
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
<style></style>
