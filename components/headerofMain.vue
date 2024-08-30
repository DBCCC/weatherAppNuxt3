<template>
  <div>
    <div class="headerSection">
      <h1>{{ headerData.name }}</h1>
      <span>{{ ` ${dayName}, ${dayOfMonth} ${monthName}` }}</span>
    </div>

    <div class="currentInformation">
      <!-- Left side of header -->
      <div class="currentInfoLeftSide">
        <img
          :src="
            'http://openweathermap.org/img/wn/' +
            headerData.weather[0].icon +
            '.png'
          "
        />
        <div class="weatherInfo">
          <h3>{{ formatNumber(headerData.main.temp) }}°</h3>
          <span>{{ headerData.weather[0].description }}</span>
        </div>
      </div>

      <div class="seperator"></div>
  <!-- Right side of header -->
      <div class="currentInfoRightSide">
        <CurrentInfoItem :data="headerData"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { formatNumber } from "@/utils/useFormatNumber";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const headerData = ref(props.data);
//Functions needed to convert the incoming dt data into the desired format.
const now = new Date();
const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const dayName = daysOfWeek[now.getDay()];
const dayOfMonth = now.getDate();
const monthsOfYear = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const monthName = monthsOfYear[now.getMonth()];
</script>
