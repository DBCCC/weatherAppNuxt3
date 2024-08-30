
import { defineStore } from 'pinia';
import {ref} from 'vue'
export const useStorageStore = defineStore('storage', () => {

    const STORAGE_KEY = "list_of_cities";


    const list_of_cities = ref();

    const set =  (value) => {
        localStorage.setItem(STORAGE_KEY,JSON.stringify(value))  
    };
    const get =  () => {
        list_of_cities.value =  JSON.parse(localStorage.getItem(STORAGE_KEY));
            console.log("GETT",list_of_cities.value);
            
        return list_of_cities.value;
    }


    return { set,get };

});