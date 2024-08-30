import { defineStore } from 'pinia'

export const useSavedLocationStore = defineStore('savedLocation', {
  state: () => ({
    locations: [],
  }),
  getters: {
    getLocations(state) {
      return state.locations
    },
  },
  actions: {
    addLocation(location) {
      this.locations.push(location)
    },
    removeLocation(id) {
      this.locations = this.locations.filter(location => location.id !== id)
    },
  },
})
