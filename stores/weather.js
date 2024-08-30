import { defineStore } from 'pinia'

export const useWeatherStore = defineStore('weather', {
  state: () => ({
    currentWeather: null,
    forecast: [],
    nextdays:[]
  }),
  getters: {
    getCurrentWeather(state) {
      return state.currentWeather
    },
    getForecast(state) {
      return state.forecast
    },
    getNextDays(state) {
      return state.nextdays
    },
  },
  actions: {
    setCurrentWeather(data) {
      this.currentWeather = data
    },
    setForecast(data) {
      this.forecast = data
    },
    setNextDays(data) {
      this.nextdays = data
    },
  },
})
