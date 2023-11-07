<template>
  <nav class="navbar navbar-dark  fixed-top" style="background-color: whitesmoke; z-index: 5;">
    <div class="container-fluid">
      <RouterLink class="navbar-brand" to="#">
        <Logo></Logo>
      </RouterLink>
      <span style="position: absolute; top: 40%;color:  #17627a; right: 10%;">{{ userEmail }}</span>
      <button class="navbar-toggler position-fixed end-0 top-1 me-3 " type="button" data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation"
        style="background-color: #17627a ; border-radius: 7px!important;">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="offcanvas offcanvas-end " tabindex="-1" id="offcanvasDarkNavbar"
        aria-labelledby="offcanvasDarkNavbarLabel" style="background-color: whitesmoke;">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasDarkNavbarLabel" style="top:15px">
            <Logo></Logo>
          </h5>
          <button type="button" class="btn-close " data-bs-dismiss="offcanvas" aria-label="Close"
            style="background-color: #17627a;"></button>
        </div>
        <div class="offcanvas-body">
          <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
            <li class="nav-item">
              <a class="nav-link active" style="color: #07171c;" aria-current="page" href="/accueil">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" style="color: #17627a;" href="/addCategory">Catégories des dépenses</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" style="color: #17627a;" href="/depenses">Comptes</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" style="color: #17627a;" href="/pLanification">Planification mensuelles</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="/depenses" role="button" data-bs-toggle="dropdown"
                aria-expanded="false" style="color: #17627a;">
                Dépenses
              </a>
            </li>
            <li @click="logOut"><img style="width: 30px; height: 30px; top: 20px; left: 10px;"
                src="@/assets/images/logOut.png" alt=""></li>
          </ul>
          <form class="d-flex mt-3" role="search" style="top: 20px!important;">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"
              style="border :2px solid #17627a; " />
            <button class="btn " style="background-color: #17627a; color: white; border-radius: 7px!important ;"
              type="submit">Search</button>
          </form>
        </div>
      </div>
    </div>
  </nav>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { RouterView } from "vue-router";
import Logo from "@/components/Logo.vue";
import router from "@/router";
import { clientHttp } from "../libs/clientHttp"

const userEmail = ref("")
const token = localStorage.getItem('token')
if (token) {
  const decodedToken = JSON.parse(atob(token.split(".")[1]));
  userEmail.value = decodedToken.email;
} else {
  router.replace('/')
}
async function logOut() {
  try {
    const response = await clientHttp.post('/users/logOut', { token })
    localStorage.removeItem('token');
    router.replace('/signin')
  } catch (error) {
    console.log(error)
  }
}
</script>
<style scoped>
@import "@/assets/css/bootstrap.min.css";

nav {
  overflow: hidden;
}

</style>
