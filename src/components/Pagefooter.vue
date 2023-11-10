<template>
  <footer>
      <div class="footer_content_item">
        <div class="item">
          <ul>
            <li class="footer_li"><LogoVue></LogoVue></li>
            <li class="footer_li" style="display: flex;"><a href="#"><Facebookicon></Facebookicon></a><a href="#"><Linkedinicon></Linkedinicon></a> <a href="#"><Instagramicon></Instagramicon></a> <a href="#"><Twittericon></Twittericon></a></li>
          
          </ul>

        </div>
        <div class="item">
          
          <ul>
            <h6>Contacts</h6>
            <li class="footer_li"><a href="#">+229 96 85 75 42</a></li>
            <li class="footer_li"><a href="#">+33 0 88 81 86 93</a></li>
            <li class="footer_li">
            <a href="#">  Email: support@email.com</a>
             
            </li>
          </ul>
        </div>
        <div class="item">
         
          <ul>
            <h6>Adresse</h6>
            <li class="footer_li">
             <a href="#"> 7631 Laurel Dr. king 
              de Prussia , PA 19406.</a>
            </li>
            <li class="footer_li"><a href="">17 Rue des oliviers Cergy-Pontoise</a></li>
          </ul>
        </div>
        <div class="item">
          
          <ul>
            <h6>Qui sommes nous ?</h6>
            <li class="footer_li"><a href="#">Compagnie</a></li>
            <li class="footer_li"><a href="#">Teams</a></li>
            <li class="footer_li"><a href="#">Carrières</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom" style="width: 100%; height: 100%; background-color: #17627a; padding: 10px 0;">
        <p style="text-align: center; margin-top: 10px; color: white;">Tous les droits réservés &copy;</p>
      </div>
  </footer>
</template>
<script lang="ts" setup>
import LogoVue from "@/components/Logo.vue";
import Instagramicon from "./Instagramicon.vue";
import Facebookicon from "./Facebookicon.vue";
import Linkedinicon from "./Linkedinicon.vue";
import Twittericon from "@/components/Twittericon.vue";
</script>
<style scoped>
footer{
 position: absolute;
}
.footer_content li {
  display: flex;
  justify-content: center;
}
footer .footer_content_item{
    display: flex;
 
    /* justify-content: space-around; */
    /* grid-template-columns: repeat(); */
    justify-content: space-between;
   
    padding: 20px 30px 20px 20px; 
}
a{
  text-decoration: none;
  color: #17627a;

}
.item h6 {
  color: #17627a;
  font-weight: 700px;
  font-size: 24px;
  text-decoration: underline;
  padding-bottom: 20px;
}
.item h6:hover {
  color: #0b161a;
}
.item {
  line-height: 30px;
}
.item_content {
  position: absolute;
}
footer {
  width: 100%;
  padding: 20px 0;
  background-color: rgba(180, 180, 222, 0.544);
  overflow-x: hidden;
  position: absolute ; 
}
.footer_li{
  list-style-type: none;
}



/* 
footer {
  width: 100%;
  padding: 20px 0;
  background-color: rgba(180, 180, 222, 0.544);
  overflow-x: hidden;
  position: absolute;
  bottom: 0;

} */

</style>
