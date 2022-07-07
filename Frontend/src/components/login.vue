<template>
  <div class="container bg-primary mt-5 col-xl-4 col-md-6 col-10 p-0 d-flex d-flex flex-column rounded shadow-lg">
    <div class="align-self-center rounded-top">
      <img class="img-fluid px-4" src="../assets/images/logo.png" alt="logo" />
    </div>
    <div class="p-4 bg-light">
      <div>
        <form>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Saissisez votre adresse email</label>
            <input type="email" class="form-control" id="exampleInputEmail1"/>
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Entrez votre mot de passe</label>
            <input type="password" class="form-control" id="exampleInputPassword1" />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Confirmer votre mot de passe</label>
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
      Vous n'êtes pas encore inscrit,
      <RouterLink to="register">cliquez-ici</RouterLink>
    </div>
  </div>
</template>
<script></script>

<style>
</style>
