<template>
  <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
    <li class="nav-item" role="presentation">
      <button class="btn btn-thirdColor m-1" id="pills-profil-tab" data-bs-toggle="pill" data-bs-target="#pills-profil"
        type="button" role="tab" aria-controls="pills-profil" aria-selected="true">
        Profil
      </button>
    </li>
    <li class="nav-item" role="presentation">
      <button class="btn btn-thirdColor m-1" id="pills-edit-tab" data-bs-toggle="pill" data-bs-target="#pills-edit" type="button"
        role="tab" aria-controls="pills-edit" aria-selected="false">
        Modifier
      </button>
    </li>
    <li class="nav-item" role="presentation">
      <button class="btn btn-thirdColor m-1" id="pills-password-tab" data-bs-toggle="pill" data-bs-target="#pills-password" type="button"
        role="tab" aria-controls="pills-password" aria-selected="false">
        Mot de passe
      </button>
    </li>
    <li class="nav-item" role="presentation">
      <button class="btn btn-thirdColor m-1" id="pills-delete-tab" data-bs-toggle="pill" data-bs-target="#pills-delete" type="button"
        role="tab" aria-controls="pills-delete" aria-selected="false">
        supprimer
      </button>
    </li>
  </ul>
  <div class="tab-content" id="pills-tabContent">
    <div class="tab-pane fade show active" id="pills-profil" role="tabpanel" aria-labelledby="pills-profil-tab">
      <div class="card p-2">
        <div class="d-flex justify-content-start align-items-center">
          <i class="fa fa-user p-2" aria-hidden="true"></i>{{ user.firstName }} {{ user.lastName }}
        </div>
        <div class="d-flex justify-content-start align-items-center">
          <i class="fa fa-envelope p-2" aria-hidden="true"></i>{{ user.email }}
        </div>
        <div class="d-flex justify-content-start align-items-center">
          <i class="fa-solid fa-people-group p-2"></i>{{ user.occupation }}
        </div>
      </div>
    </div>
    <div class="tab-pane fade" id="pills-edit" role="tabpanel" aria-labelledby="pills-edit-tab">
      <editProfile />
    </div>
    <div class="tab-pane fade" id="pills-password" role="tabpanel" aria-labelledby="pills-password-tab">
      <UpdatePassword />
    </div>
    <div class="tab-pane fade" id="pills-delete" role="tabpanel" aria-labelledby="pills-delete-tab">
      <deleteAccount />
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import editProfile from "./editProfile.vue"
import UpdatePassword from "./updatePassword.vue"
import deleteAccount from "./deleteAccount.vue";
export default {
  name: "userProfile",
  computed: {
    ...mapGetters(["user"]),
  },
  components: { editProfile, UpdatePassword, deleteAccount },
};
</script>
<style>
</style>
