import { defineEventHandler, getQuery } from 'h3'
//Service to be used when the user’s location information is not available and when using search.
export default defineEventHandler(async (event) => {
  const { city } = getQuery(event);

  if (!city) {
    return null
  }
//Required endpoints and variables.
  const API_KEY = process.env.OPENWEATHER_API_KEY;

  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&cnt=5`;

  const forecastWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast/?q=${city}&appid=${API_KEY}&units=metric&cnt=7`;

  const nextDaysUrl = `https://api.openweathermap.org/data/2.5/forecast/?q=${city}&appid=${API_KEY}&units=metric&cnt=24`;


//Requests are sent, and responses are formatted as needed.
  try {
    const [currentWeatherResponse, forecastWeatherResponse ,nextDaysResponse] = await Promise.all([
      $fetch(currentWeatherUrl),
      $fetch(forecastWeatherUrl),
      $fetch(nextDaysUrl)
    ]);
    return {
      currentWeather: currentWeatherResponse,
      forecastWeather: forecastWeatherResponse,
      nextDays: nextDaysResponse
    };
  } catch (error) {
    return null
  }
});
