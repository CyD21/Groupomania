<script>
import { usersServices } from "../../_services";
import { mapGetters } from "vuex";
export default {
  name: "Delete_Account",
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    deleteAccount() {
      usersServices
        .deleteAccount(this.user.id)
        .then(() => {
          localStorage.clear();
          this.$router.push("/enregistrement");
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
    },
  },
};
</script>
<template>
  <div class="alert border-danger text-center">
    <div class="fw-bold fs-4 p-2 text-firstColor">
      <span aria-label="Icone alerte"><i class="fa-solid fa-triangle-exclamation"></i></span>
      <span class="p-2 text-uppercase text-firstColor">Attention {{ user.firstName }}</span>
      <span aria-label="Icone alerte"><i class="fa-solid fa-triangle-exclamation"></i></span><br />
    </div>
    <div class="p-3">
      <p>
        Nous attirons votre attention sur le fait que la suppression de votre
        compte entrainera de manière définitive la perte de celui-ci et de
        l'intégralité de vos données.
      </p>
    </div>
  </div>
  <div class="mt-4 text-center">
    <button
      type="button"
      class="btn btn-thirdColor text-white"
      data-bs-toggle="modal"
      data-bs-target="#staticBackdrop"
    >
      Supprimer votre compte
    </button>
  </div>
  <div
    class="modal modal-centered fade"
    id="staticBackdrop"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <span class="modal-title" id="staticBackdropLabel">
            Compte utilisateur
          </span>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="alert alert-danger text-center border-danger">
            Êtes vous sur de vouloir confirmer la suppréssion de votre compte
            utilisateur.
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-thirdColor text-white"
            data-bs-dismiss="modal"
          >
            Annuler
          </button>
          <button
            @click="deleteAccount"
            type="button"
            class="btn btn-thirdColor text-white"
            data-bs-dismiss="modal"
          >
            Confirmer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style></style>
