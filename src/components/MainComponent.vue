<script lang="ts" setup>
  import CityWeather from './CityWeather.vue';
  import { weatherContext } from '../assets/context/weatherContext';

  const weatherStore = weatherContext();
</script>

<template>
  <div class="input_container">
    <input
      v-model="weatherStore.currentCity"
      id="cityInput"
      class="city_input"
      placeholder="Enter a city"
      @keyup.enter="weatherStore.getWeather"
    />

    <button class="button" @click="weatherStore.addToFavorites">+ Add to favorite</button>
  </div>

  <div class="schedule_container">
    <CityWeather :weatherInfo="weatherStore.weatherInfo" />
  </div>
</template>


<style scoped>
  .input_container {
    display: flex;
    justify-content: space-between;
  }

  .schedule_container {
    display: flex;
    justify-content: center;
    margin-top: 3%;
  }

  .button {
    padding: 10px 20px;
    background-color:#0073e6;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    margin: 5px;
    transition: background-color 0.3s, color 0.3s;
  }

  .button:hover {
    background-color: #00c3ff;
  }

  .city_input {
    width: 30%;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: transparent;
    outline: none;
    transition: border-color 0.3s;
  }

  .city_input:focus {
    border-color: #0073e6;
  }
</style>


