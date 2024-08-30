import { defineNuxtRouteMiddleware } from "#app";
export default defineNuxtRouteMiddleware((to, from) => {
    if (to.path === '/') {
      return navigateTo('/WeatherPage');
    }
  });