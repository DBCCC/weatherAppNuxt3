<template>
  <div class="nextDaysContainer">
    <span>Next 3 days</span>
    <table>
      <tr v-for="(item, index) in choosenHours" :key="index">
        <td>
          <div class="dayFormatWrapper">
            <h6>{{ formatDate(item.dt) }}</h6>
          </div>
        </td>
        <td>
          <img
            :src="
              'http://openweathermap.org/img/wn/' +
              item.weather[0].icon +
              '.png'
            "
            alt=""
          />
        </td>
        <td>
          <div>
            <h6>{{ formatNumber(item.main.temp_min) }}°</h6>
            <span>Low</span>
          </div>
        </td>
        <td>
          <div>
            <h6>{{ formatNumber(item.main.temp_max) }}°</h6>
            <span>High</span>
          </div>
        </td>

        <td>
          <div>
            <h6 v-if="item.rain">%{{ formatNumber(item.rain["3h"] * 10) }}</h6>
            <h6 v-else>%0</h6>
            <span>Rain</span>
          </div>
        </td>
        <td>
          <div>
            <h6>{{ item.wind.speed }} mhp</h6>
            <span>Wind</span>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script setup>
import { defineProps, ref, computed } from "vue";
import { formatNumber } from "@/utils/useFormatNumber";
import { formatDate } from "@/utils/useDateFormat";
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});
//Function for filtering the data resulting from the API response.
const choosenHours = computed(() => {
  const filteredArray = ref([]);
  if (props.data && Array.isArray(props.data.list)) {
    props.data.list.forEach((element) => {
      if (new Date(element.dt_txt).getHours() === 12) {
        filteredArray.value.push(element);
      }
    });
  }

  return filteredArray.value;
});
</script>
