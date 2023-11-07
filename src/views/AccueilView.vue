<template>
  <header><Navbar></Navbar></header>
  <div class="wrapper_content">
    <div class="wrapper">
      <main>
        <section id="banner">
          <div class="container">
            <div class="banner_content">
              <div class="banner_content_left">
                <div class="banner_content_left_title">
                  <h1>Bienvenue {{ name }}</h1>
                </div>
                <div class="banner_content_left_paragraph">
                  <p > Que faisons nous aujourd'hui ?<br/> Adole Fin est la meilleure  application de Suivi de Dépense actuellement disponible sur le marché ! Etes vous un Client? Un partenaire ? Un sponsor ? Laissez nous un courrier et nous vous répondrons dans les plus brefs délais. </p>
                </div>
              </div>
              <div class="banner_content_right">
                <div class="banner__content_right_img" id="banImage">
                  <img src="@/assets/images/img2.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </section>
      <Allservices></Allservices>
       <ServicesForm></ServicesForm> 
      </main>
    </div>
  </div>
  <footer><Pagefooter></Pagefooter></footer>
</template>
<script lang="ts" setup>
import Navbar from "@/components/Navbar.vue";
import Pagefooter from "@/components/Pagefooter.vue";
import Allservices from "@/components/Allservices.vue";
import { useToast } from "vue-toast-notification";
const $toast = useToast();
import ServicesForm from "@/components/ServicesForm.vue";
import router from "@/router";
import { ref } from "vue";
const isModelOpen = ref(false);
let msg = ref("");
let userData = ref({
email:"",
})
let name =ref("")
const token = localStorage.getItem('token');
if (token) {
  const decodedToken = JSON.parse(atob(token.split(".")[1]));
  console.log(decodedToken);
  userData.value.email = decodedToken.email;
  name.value = userData.value.email.split("@")[0];
} else {
  console.log('Le token n\'a pas été trouvé dans localStorage.');
  router.replace('/')
}
</script>
<style scoped>
/* * {
  padding: 0;
  margin: 0;
  font-size: 16px;
  font-weight: 400px;
  position: relative;
}

img {
  width: 100%;
}

.container {
  max-width: 1080px;
  margin: 0  auto;
  padding: 0 16px;
}
.navbar {
  padding: 20px;
}

.navbar_menu ul {
  display: flex;
  gap: 45px;
}

.navbar_content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}
.menu_burger {
  width: 35px;
  height: 35px;
  display: none;
}
.menu_burger span {
  width: 100%;
  height: 4px;
  background-color: #000;
  display: block;
  position: absolute;
  top: 50%;
  left: 0;
}
.menu_burger span::before,
.menu_burger span::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #000;
}
.menu_burger span::before {
  transform: translateY(12px);
}
.menu_burger span::after {
  transform: translateY(-12px);
}

.menu_burger.active span {
  background-color: transparent;
}

.menu_burger.active span::before {
  transform: translateY(0) rotateZ(-45deg);
}
.menu_burger.active span::after {
  transform: translateY(0) rotateZ(45deg);
}

.banner_content_left {
  width: 500px;
  padding-top: 30px;
   -webkit-animation: element 4s infinite; 
  animation:element 4s ease-out;
}
@keyframes element {
 from{
  transform:translateX(-50%);
  opacity: 0;
 }
 to{
  transform:translate(0%);
  opacity: 1;
 }
}
.banner_content_left_title h1 {
  color: #fff;
  font-size: 40px;
  font-weight: bold ;
  margin-bottom: 30px;
  margin-top: 50px;
}


.banner_content_left_discorver button {
  background-color: white;
  border-radius: 10px;
  padding: 10px 14px;
  border: 2px solid transparent;
}
.banner_content_left_discorver a {
  text-decoration: none;
  color: white;
}

.banner_content_left_discorver {
  margin-bottom: 45px;
  display: flex;
  gap: 30px;
}
.banner__content_right_img {
  width: 553px;
  height: 321px;
}
.banner_content {
  display: flex;
  gap: 45px;
  padding-top: 74px;
  padding-top: 64px;
  padding: 0 10px;
}
#banner {
  background-color: #17627a;
}
 */ 

</style>
