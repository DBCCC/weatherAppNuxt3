import { defineStore } from 'pinia';
import { useStorageStore } from '@/stores/storageService';

export const useSavedLocationStore = defineStore('savedLocation', {
  state: () => ({
    locations: [], // Start with an empty array
  }),
  getters: {
    getLocations(state) {
      return state.locations;
    },
  },
  actions: {
    async addLocation(location) {
      this.locations.push(location);
      await this.updateStorage();
    },
    async removeLocation(location) {
      // Remove from the local `locations` array
      this.locations = this.locations.filter(loc => loc.id !== location.id);

      // Remove from localStorage via the storage service
      const storageStore = useStorageStore();
      const currentLocations = await storageStore.get(); // Get current array from localStorage

      // Filter out the location to be removed
      const updatedLocations = currentLocations.filter(loc => loc.id !== location.id);
      
      // Update localStorage with the filtered array
      storageStore.set(updatedLocations);

      // Update the store's local array
      this.locations = updatedLocations;
    },
    async updateStorage() {
      const storageStore = useStorageStore();
      await storageStore.set(this.locations);
    },
  },
});
 