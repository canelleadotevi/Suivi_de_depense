<template>
  <section class="service_form">
    <div class="container">
      <div class="service_form_content">
        <form action="" @submit.prevent="sendMail">
          <div class="service_form_content_title">
            <h6>Contactez nous !!!</h6>
          </div>
          <div class="service_form_content_form_item">
            <input type="text" name="name" id="" placeholder="Nom et prénoms" autocomplete="off" v-model="mail.fullName"/>
          </div>
          <div class="service_form_content_form_item">
            <input type="email" name="email" id="" placeholder="E-mail" autocomplete="off" v-model="mail.email" />
          </div>
          <div class="service_form_content_form_item">
            <input type="text" name="objet" id="" placeholder="Objet" autocomplete="off" v-model="mail.subject"/>
          </div>
          <div class="service_form_content_form_item">
            <textarea
              name="Message"
              id=""
              cols="30"
              rows="10"
              placeholder="Message"
              v-model="mail.message"
            ></textarea>
          </div>
          <div class="service_form_content_submit">
            <button type="submit">Envoyez</button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
<script lang="ts" setup>
import {ref} from "vue";
import {clientHttp} from "../libs/clientHttp"
import { useToast } from "vue-toast-notification";
const $toast = useToast();
const mail = ref({
  fullName: "",
  email:"",
  subject:"",
  message: "" 
})
async function sendMail(){
try{
  if(mail.value.fullName.trim() === "" && mail.value.email.trim() === "" && mail.value.subject.trim() === "" && mail.value.message.trim() === ""){
    $toast.warning("Tous les champs sont requis")
  }
  const response = await clientHttp.post('/users/sendMail',mail.value)
  $toast.success('Mail envoyé avec suucès')
  console.log('response',response.data)
  mail.value = {
  fullName: "",
  email:"",
  subject:"",
  message: "" 
}
}catch(error){
  $toast.error('Erreur')
}
}
</script>
<style scoped>
form {
  padding-top: 10px;
  border-radius: 9px;
  border: 1px solid transparent;
  box-shadow: 0px 0px 10px rgba(46, 44, 44, 0.39);
  max-width: 500px;
  margin: 10px auto;
  margin-bottom: 50px;
  grid-template-columns: (1,1fr);
}
.service_form_content_form_item input::placeholder{
  font-size: 14px;
  font-weight: 400px;
}
</style>
