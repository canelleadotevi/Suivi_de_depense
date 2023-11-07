<template>
 <Register ></Register>
</template>
<script lang="ts" setup>
import Register from '@/components/Register.vue'

</script>
<style scoped>
/* * {
  box-sizing: border-box;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  margin: 0;
  padding: 0;
  outline: none;
  position: relative;
}
.login {
  height: 100vh;
  width: 100%;
  background: rgb(61, 124, 61);
  background-size: cover;
  padding: 20px;
}
nav {  margin: 0;

  display: flex;
  justify-content: space-between;
  align-it}
.table table {
  width: 800px;
  padding: 15px;
  z-index: -5px;
}
.table {
  display: flex;
  justify-content: center;
  /* margin-bottom: 20px; */

.button_border {
  display: flex;
  justify-content: space-between;
}
thead {
  border: 2px solid dark;
  background-color: #17627a;
  color: white;
  font-size: 24px;
}

.open {
  display: block;
}

.close {
  display: none;
}

.nav_logo a {
  width: 120px;
  cursor: pointer;
  font-size: 2.5rem;
  font-style: oblique;
  font-weight: bold;
  text-decoration: none;
  color: white;
}
button.btn {
  padding: 10px 20px;
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 0;
  background-color: transparent;
  color: white;
  border: 2px solid transparent;
  border-color: border-color 0.3s;
}
button.btn:hover {
  border-color: white;
  border-radius: 7px;
}
section.form {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px 0;
}
.form_wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: auto;
}
.form_wrapper .card {
  width: 360px;
  padding: 30px;
  background-color: white;
}

.card_body {
  display: flex;
  flex-wrap: nowrap;
  padding: 40px 0;
  text-align: center;
}

form {
  flex: 0 0 100%;
}
.toggleForm {
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.3s, visibility 0.3s;
}
.form_control {
  width: 100%;
  border: none;
  background: none;
  outline: none;
  padding: 10px 5px;
  margin-bottom: 20px;
  border-bottom: 1px solid white;
}
</style>