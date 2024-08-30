<template>
  <div class="mainContainer">
    <div class="mainContainerWrapper">
      <!-- Search , Save and Remove buttons -->
      <router-link class="backToSearchComp" to="/SearchPage">
        <button class="searchButton">Search location</button>
      </router-link>
      <button
        v-if="!isInSaved"
        @click="saveLocation()"
        class="savedLocationButton"
      >
        Add Location
      </button>
      <button
        v-if="isInSaved"
        @click="removeLocation()"
        class="locationAdded"
      >
        Remove Location
      </button>
      <!-- WeatherView main components -->
      <HeaderofMain v-if="currentWeather" :data="currentWeather" />
      <TodaysWeather v-if="foreCast" :data="foreCast" />
      <NextDays v-if="nextDaysData" :data="nextDaysData" />
    </div>
  </div>
</template>

<script setup>
import HeaderofMain from "@/components/headerofMain.vue";
import TodaysWeather from "@/components/todaysWeather.vue";
import NextDays from "@/components/nextDays.vue";
import { useWeatherStore } from "~/stores/weather";
import { useSavedLocationStore } from "~/stores/savedLocations";
import { useStorageStore } from "~/stores/storageService";

//Required Variables
const weatherStore = useWeatherStore();
const savedLocationStore = useSavedLocationStore();
const locationAdd = ref(true);
const locationRemove = ref(false);
const savedLocations = ref([]);
const storageService = useStorageStore();
// Get weather data from store.
const getSavedLocations = computed(() => savedLocationStore.getLocations);
const currentWeather = computed(() => weatherStore.getCurrentWeather);
const foreCast = computed(() => weatherStore.getForecast);
const nextDaysData = computed(() => weatherStore.getNextDays);




const isInSaved = computed(() => {
  savedLocations.value = storageService.get() ?? []
  return savedLocations.value.some(el => el.id === currentWeather.value?.id);
});


//Save and remove cities functions
const saveLocation = () => {
  // Check if the location is already saved
  if (isInSaved.value) {
    console.log("Location is already saved.");
    return; // If the location is already saved, do nothing
  }
  savedLocationStore.addLocation(currentWeather.value);
  savedLocations.value.push(currentWeather.value);
  storageService.set(savedLocations.value);
};
const removeLocation = async () => {
  console.log("lsdldsflkşslkdf");
  
  savedLocationStore.removeLocation(currentWeather.value);
  savedLocations.value =  await storageService.get() ?? [];
};

onMounted(async () => {
  // localStorage'dan kaydedilmiş konumları getir ve kontrol et
  savedLocations.value = await storageService.get() ?? [];
});
</script>