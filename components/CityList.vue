<template>
  <div v-for="(item, index) in savedLocations" :key="index">
    <button class="locationItems" @click="sendSavedLocationsData(item)">
      <span>{{ item.name }}</span>
    </button>
  </div>
</template>

<script setup>
import { defineEmits } from "vue";
import { useStorageStore } from "~/stores/storageService";

const storageService = useStorageStore();

const savedLocations = computed(() => {
  return storageService.get();
})
const emits = defineEmits(['updateData']);
//Emit function to send the selected city's data to the API.
const sendSavedLocationsData = (item) => {
  const data = item;
  emits("updateData", data);
};
</script>
