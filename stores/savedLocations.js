import { defineStore } from 'pinia'
import { useStorageStore } from '@/stores/storageService'
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
      this.setLocation();
    },
    removeLocation(id) {
      this.locations = this.locations.filter(location => location.id !== id)
      this.setLocation();
    },
    setLocation() {
      const storageStore = useStorageStore();
      storageStore.set(this.locations);
      
    }
  },
})
