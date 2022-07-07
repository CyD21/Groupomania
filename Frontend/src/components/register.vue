<template>
  <div class="container bg-primary mt-5 col-xl-4 col-md-6 col-10 p-0 d-flex d-flex flex-column rounded shadow-lg">
    <div class="align-self-center rounded-top">
      <img class="img-fluid px-4" src="../assets/images/logo.png" alt="logo" />
    </div>
    <div class="p-4 bg-light">
      <div>
        <form>
          <div class="mb-3">
            <label for="name" class="form-label">Votre nom</label>
            <input type="text" class="form-control" id="name" />
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Votre adresse email</label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            <div id="emailHelp" class="form-text">
              Nous ne partagerons jamais votre e-mail avec quelqu'un d'autre.
            </div>
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Votre mot de passe</label>
            <input type="password" class="form-control" id="exampleInputPassword1" />
          </div>
          <div class="mb-3 form-check">
            <input type="checkbox" class="form-check-input" id="exampleCheck1" />
            <label class="form-check-label" for="exampleCheck1">Se souvenir de moi</label>
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-primary px-xl-5 text-white">Valider</button>
          </div>
        </form>
      </div>
    </div>
    <div class="bg-light text-center py-3 rounded-bottom">
      Vous êtes déjà inscrit,
      <RouterLink to="login">connectez vous</RouterLink>
    </div>
  </div>
</template>
<script></script>

<style>
</style>
