<template>
  <div class="searchComponentWrapper">
    <div class="searchContainer">
      <!-- Search Component Form -->
      <form class="serachInput" @submit.prevent="searchWeather()">
        <input
          v-model="searchValue"
          type="text"
          placeholder="Search for a city..."
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          fill="currentColor"
          class="bi bi-search"
          viewBox="0 0 16 16"
        >
          <path
            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"
          />
        </svg>
        <div class="searchRightSide">
          <div class="searchButton">
            <button type="submit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-crosshair"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8.5.5a.5.5 0 0 0-1 0v.518A7 7 0 0 0 1.018 7.5H.5a.5.5 0 0 0 0 1h.518A7 7 0 0 0 7.5 14.982v.518a.5.5 0 0 0 1 0v-.518A7 7 0 0 0 14.982 8.5h.518a.5.5 0 0 0 0-1h-.518A7 7 0 0 0 8.5 1.018zm-6.48 7A6 6 0 0 1 7.5 2.02v.48a.5.5 0 0 0 1 0v-.48a6 6 0 0 1 5.48 5.48h-.48a.5.5 0 0 0 0 1h.48a6 6 0 0 1-5.48 5.48v-.48a.5.5 0 0 0-1 0v.48A6 6 0 0 1 2.02 8.5h.48a.5.5 0 0 0 0-1zM8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4"
                />
              </svg>
            </button>
          </div>
        </div>
        <!-- Saved Cities Container -->
        <div v-if="cities" class="savedLocationsContainer">
          <h3>Saved Locations :</h3>
          <div class="locationItemWrapper">
            <CityList @updateData="searchWeather" />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from "vue";
import { useFetch } from "#app";
import CityList from "./CityList.vue";
import { useStorageStore } from "~/stores/storageService";
//Required Variables
const searchValue = ref(null);
const weather = ref(null);
const error = ref(null);
const emit = defineEmits(["dataFetched"]);


const storageService = useStorageStore();

const cities = ref()



//Fetch Weather Data from API
async function searchWeather(item) {
//The data from the search input triggers the API service, and the response from the API is emitted for use
  const { data, error: fetchError } = await useFetch(`/api/weather`, {
    //If there is a city name saved other than the search input, a request can also be sent to the API using that city name.
    params: {
      city: searchValue.value ? searchValue.value : item ? item.name : "",
    },
  });
  if (fetchError.value) {
    error.value = fetchError.value.message;
    weather.value = null;
  } else {
    weather.value = data.value;
    error.value = null;
    emit("dataFetched", weather.value);
  }
}
onMounted(async() => {
  cities.value =  await storageService.get() ?? [];
});
</script>
