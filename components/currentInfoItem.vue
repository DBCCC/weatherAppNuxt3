<template>
  <div
    class="currentInfoItem"
    v-for="(item, index) in currentDataDetail"
    :key="index"
  >
    <span class="currentInfoItemValue"
      >{{ formatNumber(item.value) }} <span v-if="item.key == 'High'">°</span>
      <span v-if="item.key == 'Low'">°</span>
      <span v-if="item.key == 'Wind'">mph</span>
      </span
    >
    <span class="currentInfoItemKeys">{{ item.key }}</span>
  </div>
</template>

<script setup>
import { formatNumber } from "@/utils/useFormatNumber";
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});
const currentDataDetail = ref([
  { key: "High", value: props.data.main.temp_max },
  { key: "Wind", value: props.data.wind.speed},
  { key: "Humidity", value: props.data.main.humidity + "%" },
  { key: "Low", value: props.data.main.temp_min },
  { key: "Pressure", value: props.data.main.pressure + " in" },
  { key: "Sea Level", value: props.data.main.sea_level + " hPa" },
]);

</script>
