<template>
 <div class="icon" :class="{ pinkBackground: isPink }" @mouseenter="toggleHover">
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24" 
    :style="{ fill: iconColor }"
  >
    <circle cx="6" cy="4" r="2"></circle>
    <path d="M9 7H3a1 1 0 0 0-1 1v7h2v7h4v-7h2V8a1 1 0 0 0-1-1z"></path>
    <circle cx="17" cy="4" r="2"></circle>
    <path
      d="M20.21 7.73a1 1 0 0 0-1-.73h-4.5a1 1 0 0 0-1 .73L12 14h2l-1 4h2v4h4v-4h2l-1-4h2z"
    ></path>
  </svg>
 </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
  
  const isPink = ref(false);
  const iconColor = ref('var(--personal-color)');
  
  const toggleHover = () => {
    isPink.value = !isPink.value;
    updateIconColor();
  };
  
  const updateIconColor = () => {
    if (isPink.value) {
      iconColor.value = 'white';
    } else {
      iconColor.value = 'var(--personal-color)';
    }
  };
</script>
<style scoped>
  .pinkBackground {
    background-color: var(--personal-color);
  }
  
  .icon:hover svg {
    fill: var(--primary-color);
    transition: fill 0.3s ease;
  }
  .pinkBackground:hover svg {
    fill: white;
  }
</style>
