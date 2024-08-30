import { defineEventHandler, getQuery } from 'h3'
//Service to be used if the user's location information is available.
export default defineEventHandler(async (event) => {
  const { lat, lon } = getQuery(event);

  if (!lat || !lon) {
    return { status: 400, message: 'Latitude (lat) and Longitude (lon) values are required.' };
  }
 
//Required endpoints and variables.

  const API_KEY = process.env.OPENWEATHER_API_KEY;

  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&cnt=5`;

  const forecastWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&cnt=7`;

  const nextDaysUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&cnt=24`;


//Requests are sent, and responses are formatted as needed.
  try {
    const [currentWeatherResponse, forecastWeatherResponse, nextDaysResponse] = await Promise.all([
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
    return {
      status: 500,
      message: 'An error occurred while fetching the weather data.',
      error: error.message
    };
  }
});
