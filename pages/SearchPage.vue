<template>
<!-- Main view page for the Search page. -->
    <NuxtLayout>
        <SearchForm  @dataFetched="handleDataFetched"/>
    </NuxtLayout>
</template>

<script setup>
import SearchForm from '@/components/SearchForm.vue'
import { ref } from 'vue';
import { useWeatherStore } from '~/stores/weather'
//Required Variables
const weatherStore = useWeatherStore()
const receivedData = ref(null)

//Function triggered by the event from the search form component
const handleDataFetched = async(data) => {
    //Emitted data parameter containing the information.
    receivedData.value = data
    if(receivedData.value){
        //Functions to store the returned data in the store
        weatherStore.setCurrentWeather(receivedData.value.currentWeather)
        weatherStore.setForecast(receivedData.value.forecastWeather)
        weatherStore.setNextDays(receivedData.value.nextDays)
        //Navigate to the page where the data will be displayed in the application
        navigateTo('/WeatherPage') 
    }
    
};





</script>