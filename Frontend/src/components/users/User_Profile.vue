<script>
import { mapGetters } from "vuex";
import Welcome from "./Welcome_Profile.vue";
import editProfile from "./Edit_Profile.vue";
import UpdatePassword from "./Update_Password.vue";
import deleteAccount from "./Delete_Account.vue";
export default {
  name: "User_Profile",
  components: { Welcome, editProfile, UpdatePassword, deleteAccount },
  computed: {
    ...mapGetters(["user"]),
  },
};
</script>
<template>
  <div class="">
    <welcome />
  </div>
  <div class="d-flex flex-column">
    <ul class="nav nav-pills mb-3 d-flex justify-content-center align-items-center" id="pills-tab" role="Table de gestion du profil utilisateur">
      <li class="nav-item" role="Profil utilisateur">
        <button
          class="btn btn-thirdColor m-1"
          id="pills-profil-tab"
          data-bs-toggle="pill"
          data-bs-target="#pills-profil"
          type="button"
          role="table profil"
          aria-controls="Contenu profil utilisateur"
          aria-selected="true"
        >
          Profil
        </button>
      </li>
      <li class="nav-item" role="Modification du profil">
        <button
          class="btn btn-thirdColor m-1"
          id="pills-edit-tab"
          data-bs-toggle="pill"
          data-bs-target="#pills-edit"
          type="button"
          role="tab"
          aria-controls="Modification du profil"
          aria-selected="false"
        >
          Modifier
        </button>
      </li>
      <li class="nav-item" role="Modification du mot de passe">
        <button
          class="btn btn-thirdColor m-1"
          id="pills-password-tab"
          data-bs-toggle="pill"
          data-bs-target="#pills-password"
          type="button"
          role="tab"
          aria-controls="Modification du mot de passe"
          aria-selected="false"
        >
          Mot de passe
        </button>
      </li>
      <li class="nav-item" role="Suppression du compte">
        <button
          class="btn btn-thirdColor m-1"
          id="pills-delete-tab"
          data-bs-toggle="pill"
          data-bs-target="#pills-delete"
          type="button"
          role="tab"
          aria-controls="Suppression du compte"
          aria-selected="false"
        >
          supprimer
        </button>
      </li>
    </ul>
    <div class="tab-content" id="pills-tabContent">
      <div
        class="tab-pane fade show active"
        id="pills-profil"
        role="Gestion du profil utilisateur"
        aria-label="Profil utilisateur"
      >
        <div class="card p-2">
          <div class="d-flex justify-content-start align-items-center">
            <i class="fa fa-user p-2" aria-hidden="true"></i
            >{{ user.firstName }} {{ user.lastName }}
          </div>
          <div class="d-flex justify-content-start align-items-center">
            <i class="fa fa-envelope p-2" aria-hidden="true"></i
            >{{ user.email }}
          </div>
          <div class="d-flex justify-content-start align-items-center">
            <i class="fa-solid fa-people-group p-2"></i>{{ user.occupation }}
          </div>
        </div>
      </div>
      <div
        class="tab-pane fade"
        id="pills-edit"
        role="Modification du profil utilisateur"
        aria-label="Modification du profil utilisateur"
      >
        <editProfile />
      </div>
      <div
        class="tab-pane fade"
        id="pills-password"
        role="Modification du mot de passe"
        aria-label="Modification du mot de passe"
      >
        <UpdatePassword />
      </div>
      <div
        class="tab-pane fade"
        id="pills-delete"
        role="Suppression du compte utilisateur"
        aria-label="Suppression du compte utilisateur"
      >
        <deleteAccount />
      </div>
    </div>
  </div>
</template>
<style></style>
