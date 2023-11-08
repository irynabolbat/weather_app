import {useToast} from 'vue-toast-notification';
import { API_KEY, BASE_URL } from '@/constants';
import { defineStore } from 'pinia';
import { onMounted, ref, watch } from 'vue';
import { capitalizeFirstLetter } from '@/utils';

export const weatherContext = defineStore('weather', () => {
  const allCities = ref([]);
  const currentCity = ref('Kyiv');
  const weatherInfo = ref(null);
  const favoriteCities = ref('');

  const toaster = useToast();

  const setCurrentCity = (city: string) => {
    currentCity.value = city;
  }

  const getWeather = () => {
    fetch(`${BASE_URL}?q=${currentCity.value}&units=metric&appid=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => (weatherInfo.value = data))
      .catch((error) => {
        console.error('City is not found', error);
      });
  };

  const addToFavorites = () => {
    if (favoriteCities.value.includes(currentCity.value)) {
      toaster.warning('This city is already in favorites');
    } else if (favoriteCities.value.split(',').length >= 5) {
      toaster.warning('The maximum number of selected cities is no more than 5');
    } else if (favoriteCities.value.length === 0) {
      favoriteCities.value += currentCity.value;
      toaster.success(`${capitalizeFirstLetter(currentCity.value)} added to favorites`);
    } else {
      favoriteCities.value += `, ${currentCity.value}`;
      toaster.success(`${capitalizeFirstLetter(currentCity.value)} added to favorites`);
    }

    localStorage.setItem("favorite_cities", favoriteCities.value);
  };
  

  onMounted(() => {
    getWeather();

    const storedFavorites = localStorage.getItem('favorite_cities');
    if (storedFavorites) {
      favoriteCities.value = storedFavorites;
    }

    watch(favoriteCities, (newFavorites) => {
      localStorage.setItem('favorite_cities', newFavorites);
    });
  });

  return {
    allCities,
    currentCity,
    weatherInfo,
    favoriteCities,
    setCurrentCity,
    getWeather,
    addToFavorites,
    onMounted,
  }
})
