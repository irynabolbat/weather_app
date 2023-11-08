<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import { capitalizeFirstLetter, getTime, getPressureMm, convertName } from '../utils/index';

const route = useRoute();

const props = defineProps({
  weatherInfo: {
    type: Object,
    required: true,
  },
  onDelete: {
    type: Function,
    required: true,
  }
});

const timezone = computed(() => props.weatherInfo?.timezone);

const sunriseTime = computed(() => {
  return getTime(props.weatherInfo?.sys?.sunrise + (timezone.value || 0));
});

const sunsetTime = computed(() => {
  return getTime(props.weatherInfo?.sys?.sunset + (timezone.value || 0));
});

const today = new Date().toLocaleString('en-EN', {
  weekday: 'short',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});
</script>

<template setup>
  <div v-if="weatherInfo?.weather" class="weather_info">
    <div class="temp">
      {{ Math.round(weatherInfo?.main?.temp) }} °C
    </div>

    <div class="weather">
      <img 
        :src="`../assets/images/weather_main/${convertName(weatherInfo?.weather[0].description)}.png`" 
        :alt="`${weatherInfo?.weather[0].description}`"
        class="image"
      />

      <div class="weather_desc">
        {{ capitalizeFirstLetter(weatherInfo?.weather[0].description) }}
      </div>
    </div>

    <div class="info">
      Humidity {{ weatherInfo?.main.humidity }} %
    </div>

    <div class="info">
      Wind {{ weatherInfo?.wind?.speed }} m/s {{ weatherInfo?.wind?.deg }} deg
    </div>

    <div v-if="weatherInfo?.wind?.gust" class="info">
      Wind gusts {{ Math.round(weatherInfo?.wind?.gust) }} m/s
    </div>

    <div class="info">
      Presure {{ getPressureMm(weatherInfo?.main?.pressure) }} mm
    </div>

    <div class="info">
      Feels like {{ Math.round(weatherInfo?.main?.feels_like) }} °C
    </div>

    <div class="info">
      Cloudiness {{ weatherInfo?.clouds?.all }} %
    </div>

    <div>
      <img src="../assets/images/sun_moving.png" class="sun_moving_img"/>

      <div class="sun_moving_container">
        <div>
          Sunrise
          <br />
          {{ sunriseTime }}
        </div>

        <div>
          Sunset
          <br />
          {{ sunsetTime }}
        </div>
      </div>
    </div>

    <div class="city">
      <img src="../assets/images/location.svg" class="icon"/>
      {{ weatherInfo?.name }},
      {{ weatherInfo?.sys.country }}
    </div>

    <div class="date">
      {{ today }}
    </div>

    <button v-if="route.path === '/favorite'" class="delete" @click="() => onDelete(weatherInfo?.name)">
      <img src="../assets/images/delete.png" class="icon"/>
    </button>
  </div>
</template>

<style scoped>
  .weather_info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 7px;
    color: white;
    background: linear-gradient(to right, #0073e6, #00c3ff);
    border-radius: 10px;
    padding: 10px;
  }

  .delete {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    background-color: transparent;
    border: none;
    cursor: pointer;
  }

  .temp {
    text-align: center;
    font-size: 25px;
    font-weight: bold;
  }

  .icon {
    width: 20px;
    height: 20px;
  }

  .weather {
    text-align: center;
  }
  
  .city {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 7%;
    font-size: 20px;
  }

  .info {
    display: flex;
    justify-content: start;
    align-items: center;
  }

  .sun_moving_img {
    width: 50%;
    margin-left: 20%;
  }

  .sun_moving_container {
    display: flex;
    justify-content: space-around;
  }

  .date {
    text-align: center;
  }
</style>
