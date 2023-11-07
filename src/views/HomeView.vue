<template>
  <body>
    <section class="body">
    <div class="container">
      <div class="body_content">
        <div class="body_content_item">
          <div style="display: flex; gap: 10px; justify-content: center; padding-bottom: 30px; align-items: center;">
            <span style="color: white; padding-top: 9px;">Votre Application de Suivi de dépense </span
            ><Logo></Logo>
          </div>
          <div style="width: 130px; margin: 0 auto;">
            <div class="button">
            <RouterLink to="/signin"
              >Continuer ? <IconNext></IconNext>
            </RouterLink>
          </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</body>
</template>

<script lang="ts" setup>
import IconNext from "@/components/IconNext.vue";
import Logo from "@/components/Logo.vue";
</script>

<style scoped>
* {
  font-size: 14px;
  font-weight: 400px;
  box-sizing: border-box;
  position: relative;
  font-style: italic;
  margin: 0;
  padding: 0;
}
.container{
    max-width: 1080px;
    margin: 0 auto;

  }
  .body{
    background-color: #020303e2;
    min-height: 100vh;
    min-width: 100vw;
    padding: 20px;
    
  }
  body{
    /* overflow-x: hidden; */
    overflow: hidden;
    margin: 0;
  }
  span{
    padding-top: 1000px;
  }
  .button {
  color: white;
  font-size: 24px;
  padding-bottom: 20px;
}
.button a {
  background-color: white;
  text-decoration: none;
  border-radius: 9px;
  color: gray;
  display: flex;
  gap: 10px;
  padding: 10px 15px;
}

.body_content_item{
  margin-top: 300px;
  align-items: center;
}

</style>
