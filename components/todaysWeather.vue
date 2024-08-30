<template>
  <div class="todaysWeatherMain">
    <span>Today's weather</span>
    <div class="todayWeatherContainer">
      <!-- Swiper for mobile view -->
      <Swiper
        :breakpoints="swiperBreakPoints"
        :slides-per-view="4"
        :space-between="10"
      >
        <SwiperSlide v-for="(item, index) in props.data.list" :key="index">
          <div class="todayWeatherItem">
            <span>{{ formatUnixTimeTo12Hour(item.dt) }}</span>
            <img
              :src="
                'http://openweathermap.org/img/wn/' +
                item.weather[0].icon +
                '.png'
              "
              alt=""
            />
            <span>{{ formatNumber(item.main.temp) }}°</span>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { formatNumber } from "@/utils/useFormatNumber";
import { formatUnixTimeTo12Hour } from "@/utils/useTimeFormat";

const props = defineProps({
  data: {
    type: Object,
  },
});
//Swiper settings and break points
const swiperBreakPoints = computed(() => ({
  640: {
    slidesPerView: 4,
  },
  768: {
    slidesPerView: 7,
  },
}));
</script>
