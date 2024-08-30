<template>
  <div class="mainContainer">
    <div class="mainContainerWrapper">
      <!-- Search , Save and Remove buttons -->
      <router-link class="backToSearchComp" to="/SearchPage">
        <button class="searchButton">Search location</button>
      </router-link>
      <button
        v-if="locationAdd"
        @click="saveLocation()"
        class="savedLocationButton"
      >
        Add Location
      </button>
      <button
        v-if="locationRemove"
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
import { watch } from "vue";
import { useWeatherStore } from "~/stores/weather";
import { useSavedLocationStore } from "~/stores/savedLocations";
//Required Variables
const weatherStore = useWeatherStore();
const savedLocationStore = useSavedLocationStore();
const locationAdd = ref(true);
const locationRemove = ref(false);

// Get weather data from store.
const getSavedLocations = computed(() => savedLocationStore.getLocations);
const currentWeather = computed(() => weatherStore.getCurrentWeather);
const foreCast = computed(() => weatherStore.getForecast);
const nextDaysData = computed(() => weatherStore.getNextDays);

watch(() => {
  if (getSavedLocations.value.length > 0) {
    if (
      getSavedLocations.value.some(
        (location) => location.id === currentWeather.value.id
      )
    ) {
      locationAdd.value = false;
      locationRemove.value = true;
    }
  }
});

//Save and remove cities functions
const saveLocation = () => {
  savedLocationStore.addLocation(currentWeather.value);
  locationAdd.value = false;
  locationRemove.value = true;
};
const removeLocation = () => {
  savedLocationStore.removeLocation(currentWeather.value.id);
  locationAdd.value = true;
  locationRemove.value = false;
};
</script>
