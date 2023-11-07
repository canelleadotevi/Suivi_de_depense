<template>
  <body>
    <div class="body_authentification">
      <div class="form_body_authentification">
        <div class="wrapper_authentification">
          <div class="form_title_authentification">
            <h1>Inscription</h1>
          </div>
          <form @submit.prevent="register">
            <label for="email">Email</label>
            <input
              type="email"
              class="form_control_authentification"
              name="email"
              id="email"
              v-model="user.email"
              autocomplete="off"
            />
            <label for="password">Password</label>
            <input
              type="password"
              class="form_control_authentification"
              name="password"
              id="password"
              v-model="user.password"
            />
            <div class="authentificate_authentification">
              <button type="submit" class="formButton_authentification">submit</button>
              <RouterLink to="/signin">
                <span style="">Vous avez déjà un compte ?</span></RouterLink
              >
            </div>
          </form>
        </div>
      </div>
    </div>
  </body>
</template>
<script lang="ts" setup>
  import router from "@/router";
  import { clientHttp } from "../libs/clientHttp";
  import { ref } from "vue";
  import { useToast } from "vue-toast-notification";
  const $toast = useToast();
  const error = ref("")
  const user = ref({
    email: "",
    password: ""

  });
const register = async function () {
    if (user.value.email.trim() === "" || user.value.password.trim() === "") {
       $toast.error("Tous les champs sont requis")
        } 
    try {
      
      const response = await clientHttp.post("/users/register",user.value);
      localStorage.setItem('userEmail',response.data.user.email)
      $toast.success(response.data.message)
      user.value.email = "";
      user.value.password = "";
      router.replace("/verify");
    } catch (error) {
      console.log("erreur")
    }

};

 </script>
<style scoped>

</style>
