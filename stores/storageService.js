import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useStorageStore = defineStore('storage', () => {

    const STORAGE_KEY = "list_of_cities";

    // Using an empty array as the initial value for the ref
    const list_of_cities = ref([]);

    // Save value to localStorage
    const set = (value) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
        list_of_cities.value = value; // Update the ref
    };

    // Retrieve value from localStorage
    const get = () => {
        const storedValue = localStorage.getItem(STORAGE_KEY);
        list_of_cities.value = storedValue ? JSON.parse(storedValue) : [];
        return list_of_cities.value;
    };

    // Clear localStorage and empty the ref
    const clear = () => {
        localStorage.removeItem(STORAGE_KEY);
        list_of_cities.value = [];
    };

    return { set, get, clear };
});
