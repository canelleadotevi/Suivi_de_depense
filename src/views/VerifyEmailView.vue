<template>
  <body>
      <div class="body_authentification">
        <div class="form_body_authentification">
          <div class="wrapper_authentification">
            <div class="form_title_authentification">
              <h1>Veuillez entrer votre code opt</h1>
            </div>
            <form @submit.prevent="verify">
              <input
                type="text"
                class="form_control_authentification"
                name=""
                id=""
                v-model="user.opt"
                autocomplete="off"
              />
              <div class="authentificate_authentification">
                <button type="submit" class="formButton_authentification">submit</button>
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
  const error = ref("")
  const user = ref({
    email: "",
    opt: ""
  });
  /*      const opt = localStorage.getItem('opt')
        if(opt){
          axios.defaults.headers.common["Authorization"] = `Bearer ${opt}`
        } */
  const userEmail = localStorage.getItem('userEmail')
  const verify = async function () {
  
        if(userEmail){
          try{
              user.value.email = userEmail
              const userData = await clientHttp.post('/users/verify',user.value)
              console.log(userData)
              user.value.opt = ""
              router.replace('/signin')
          }catch(error){
              console.log(error)
          }
          };
  }
  </script>
  <style scoped>
  </style>