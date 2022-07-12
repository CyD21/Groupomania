<template>
  <div class="card mb-3 col-11 col-xl-8 mx-auto mt-3 px-2 px-md-0 bg-thirdColor text-white fw-lighter">
    <div class="row g-0">
      <div class="col-md-3 d-flex justify-content-center justify-content-xl-start align-items-center">
        <img
          src="../assets/images/defaultprofile.jpg"
          class="img-fluid rounded mt-3 mt-md-0 p-md-2 p-xl-0"
          alt="..."
        />
      </div>
      <div class="col-md-9 d-flex justify-content-center align-items-center">
        <div class="card-body p-md-0 ms-md-2">
          <div class="card-title" v-if="user">
            Bonjour, <strong>{{ user.firstName }}</strong> bienvenue sur le réseau Groupomania
          </div>
          <div class="card-title" v-if="!user">
            Bonjour, Merci de bien vouloir vous connecter pour accéder au réseau
          </div>
          <p class="card-text">
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer.
          </p>
          <p class="card-text">
            <small class="text-light fst-italic">Votre session prendra fin dans 1 heure</small>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Welcome",
  props: ["user"],
};
</script>
<style></style>
