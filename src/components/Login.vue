<template>
<body>
  <div class="body_authentification">
    <div class="form_body_authentification"> 
    <div class="wrapper_authentification">
      <div class="form_title_authentification">
        <h1>Connexion</h1>
      </div>
      <form action="" id="formLogin_authentification" @submit.prevent="login">
        <label for="email"></label>
        <input
          type="email"
          class="form_control_authentification"
          name="email"
          id="email"
          required
          v-model="userData.email"
          
        autocomplete="off"/>
        <label for="password"></label>
        <input
          type="password"
          class="form_control_authentification"
          name="password"
          id="password"
          required
          v-model="userData.password"
          
        autocomplete="off" />
        <div class="authentificate_authentification">
          <button type="submit" class="formButton_authentification">Submit</button>
         <RouterLink to="/signup"> <span style="">Vous n'avez pas encore de compte ?</span></RouterLink>
        </div>
      </form>
    </div>
  </div>
  </div>

</body>
</template>
<script lang="ts" setup>
import {RouterLink  } from "vue-router";
import router from "@/router";
import { useToast } from "vue-toast-notification";
const $toast = useToast();
import { clientHttp } from "../libs/clientHttp";
import { ref } from "vue";
import axios from "axios";
const error = ref(" ")
const userData = ref({
  email: "",
  password: ""
});
const login = async function () {
  if (
    userData.value.email.trim() === "" &&
    userData.value.password.trim() === ""
  ) {
    const message ='Tous les champs sont requis'
    $toast.error(message) ;
    
  } else {
    try {
      const userExist = await clientHttp.post("/users/login", userData.value);
      localStorage.setItem('token',userExist.data.token)
      console.log(userExist);
      
      userData.value.email = "";
      userData.value.password = "";

     const token = localStorage.getItem('token')
      if(token){
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
      }
      router.replace("/accueil");
    } catch (e) {
        error.value = "oups something wrong"
        $toast.error('Une erreur s\'est produite')
    }
  }
};

</script>
<style scoped>

 </style>
