<template>
  <!-- Default page transitions applied on page loads -->
    <div :class="{ 'fade-in': true, 'fade-in-active': isLoaded }">
      <slot />
    </div>
  </template>
  <script setup>
import { ref, onMounted } from 'vue';
const isLoaded = ref(false);
onMounted(() => {
  isLoaded.value = true;
});
</script>
  <style scoped>
.fade-in {
  opacity: 0; 
  transition: opacity 1s ease-in;
}
.fade-in.fade-in-active {
  opacity: 1;
}
  </style>