<template>
  <div v-for="(item, index) in savedLocations" :key="index">
    <button class="locationItems" @click="sendSavedLocationsData(item)">
      <span>{{ item.name }}</span>
    </button>
  </div>
</template>

<script setup>
import { defineEmits } from "vue";
import { useSavedLocationStore } from "~/stores/savedLocations";
const savedLocationStore = useSavedLocationStore();
const emit = defineEmits();

//Function to retrieve the saved cities from the store.
const savedLocations = computed(() => {
  return savedLocationStore.getLocations;
});
//Emit function to send the selected city's data to the API.
const sendSavedLocationsData = (item) => {
  const data = item;
  emit("updateData", data);
};
</script>
