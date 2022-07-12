<template>
  <div class="container bg-thirdColor m0 text-white p-2 mt-xl-4 rounded-pill">
    <div class="text-light text-center d-flex" v-if="user">
      <div>
        {{ user.profilePicture }}
      </div>
      <div>Bonjour, {{ user.name }} bienvenue sur le réseau Groupomania</div>
    </div>
    <div class="text-light" v-if="!user">
      Bonjour, vous êtes actuellement déconnecté
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "Welcome",
  props: ["user"],
};
</script>
<style></style>
