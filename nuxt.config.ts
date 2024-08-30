// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  app: {
    layoutTransition: { name: 'layout', mode: 'out-in' },
    head: {
      title: 'Weather App',
      meta: [
        { name: 'description', content: 'A weather application developed with Nuxt 3 using the OpenWeather API.' }
      ],
    }
  },
  modules: [
    '@pinia/nuxt',
    'nuxt-swiper'
  ],
})