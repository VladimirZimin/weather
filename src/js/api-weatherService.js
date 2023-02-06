const BASE_URL = 'http://api.weatherapi.com/v1/current.json';
const API_KEY = 'ba9aa854d3084e4b835183530230402';
const LANG = 'ru';

export default async function fetсhWeather(query) {
  try {
    const response = await fetch(
      `${BASE_URL}?key=${API_KEY}&q=${query}&aqi=no&lang=${LANG}`,
    );
    const dataWeather = response.json();

    return dataWeather;
  } catch (error) {
    console.log('Ошибка', error);
  }
}
