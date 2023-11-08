<script lang="ts" setup>
  import CityWeather from './CityWeather.vue';
  import { weatherContext } from '../assets/context/weatherContext';
  import { API_KEY, BASE_URL } from '@/constants';
  import { ref, onMounted } from 'vue';

  type WeatherInfo = {
    name: string;
  };

  const weatherStore = weatherContext();

  const citiesWeatherInfo = ref<WeatherInfo[]>([]);
  const cities = weatherStore.favoriteCities.split(',');

  const getFavWeather = async (city: string) => {
    try {
      const response = await fetch(`${BASE_URL}?q=${city}&units=metric&appid=${API_KEY}`);
      const data = await response.json() as WeatherInfo;
      citiesWeatherInfo.value.push(data);
    } catch (error) {
      console.error('City is not found', error);
    }
  };

  const confirmDelete = (cityName: string) => {
    const confirmation = window.confirm('Are you sure you want to delete this city from favorites?');
    if (confirmation) {
      removeFromFavorites(cityName);
    }
  };

  const removeFromFavorites = (cityName: string) => {
    citiesWeatherInfo.value = citiesWeatherInfo.value.filter(city => city.name !== cityName);
    updateFavoriteCities();
  };

  const updateFavoriteCities = () => {
    const favoriteCityNames = citiesWeatherInfo.value.map(city => city.name);
    weatherStore.favoriteCities = favoriteCityNames.join(',');
  };

  onMounted(async () => {
    for (let i = 0; i < cities.length; i++) {
      await getFavWeather(cities[i]);
    }
  });
</script>

<template>
  <div>
    <h1 class="title">Favorites</h1>
    <span v-if="citiesWeatherInfo.length === 0">No favorite cities</span>
    <div v-else class="favorites_cities">
      <div v-for="city in citiesWeatherInfo" :key="city.name">
        <CityWeather :weatherInfo="city" :onDelete="confirmDelete" />
      </div>
    </div>
  </div>
</template>

<style scoped>
  .title {
    text-align: center;
  }
  .favorites_cities {
    display: grid;
    grid-template-columns: repeat(2, 50%);
    justify-content: space-around;
    gap: 3%;
  }

  @media screen and (min-width: 762px) {
    .favorites_cities {
      grid-template-columns: repeat(3, 30%);
    }
  }
</style>
