<template>
    <NuxtPage  v-if="location"/>
    <lottieAnimation v-if="userPermission"  v-model="mainMessage" />
</template>

<script setup>
import { ref } from 'vue';
import { useWeatherStore } from '~/stores/weather'
import { useFetch } from '#app';
import lottieAnimation from '@/components/lottieAnimation.vue'

//Required Variables
const weatherStore = useWeatherStore()
const error = ref(null)
const geoLocationValues = ref(null)
const location = ref(null);
const userPermission = ref(true)
const messageforUser = ref('Trying to get location information...')
const messageForSearch = ref('You are being directed to search for a location!')
const mainMessage = ref(messageforUser.value)


// Get User Location
const getLocation = () => {
//User's location information obtained via the browser's navigator. 
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      setTimeout(() => {
        location.value = {
        lat: position.coords.latitude,
        lon: position.coords.longitude
      };
      userPermission.value = false
      }, 700);
      navigateTo('/WeatherPage')
    }, (error) => {
        mainMessage.value = messageForSearch.value
        setTimeout(() => {
          userPermission.value = false
          location.value = !null
          navigateTo('/SearchPage')
        }, 700);


      console.error("An error occurred while retrieving location information:", error.message);
    });
  } else {
    console.error("The browser does not support the Geolocation API.");
  }
};

//Fetch Data with GeoLocation
async function searchWithGeoLocation() {
    
  if (!location.value || !location.value.lat || !location.value.lon) {
    error.value = "Location information could not be retrieved. Please allow location permissions.";
    return;
  }
//The data obtained from the getLocation function is sent to the required endpoint.
  const { data, error: fetchError } = await useFetch('/api/geoLocation', {
    params: { lat: location.value.lat, lon: location.value.lon }
  });

  if (fetchError.value) {
    error.value = fetchError.value.message;
  } else {
    geoLocationValues.value = data.value;
//Functions to store the returned data in the store.
    weatherStore.setCurrentWeather(geoLocationValues.value.currentWeather)
    weatherStore.setForecast(geoLocationValues.value.forecastWeather)
    weatherStore.setNextDays(geoLocationValues.value.nextDays)
    error.value = null;
    if(geoLocationValues.value){
        navigateTo('/WeatherPage')
    }
  }
}
watch(()=> {
    if(!location.value){
      getLocation()
    }
    if(location.value){
      searchWithGeoLocation()
    }
},{immediate:true})
</script>
<style>
@import url('@/public/style.css');
@import url('@/public/responsive.css'); 
@import url('@/public/default.css'); 

</style>