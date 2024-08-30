<template>
  <div class="loadingAnimationWrapper">
    <div>
      <Vue3Lottie :animationData="Loading" :height="200" :width="200" />
      <h2>{{ modelValue }}</h2>
    </div>
  </div>
</template>

<script setup>
import { Vue3Lottie } from "vue3-lottie";
import Loading from "@/public/animations/lottie.json";
const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);
</script>
