<script lang="ts">
</script>

<template>
  <div>
    <div class="app_wrapper">
      <img src="@/assets/images/weather_logo.png" class="logo" />

      <div class="app_navigation">
        <router-link to="/" class="button">Main</router-link>
        <router-link to="/favorite" class="button">Favorite</router-link>
      </div>

      <div class="weather_wrapper">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>


<style scoped>
  .app_wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
  }

  .logo {
    width: 20%;
  }

  .app_navigation {
    display: flex;
    width: 80%;
    gap: 1%;
  }

  .weather_wrapper {
    width: 80%;
    margin-left: 1%;
    margin-top: 2%;
  }

  .button {
    padding: 10px 20px;
    background-color:#0073e6;
    color: white;
    border: none;
    border-radius: 5px;
    text-decoration: none;
    cursor: pointer;
    font-weight: bold;
    margin: 5px;
    transition: background-color 0.3s, color 0.3s;
  }

  .button:hover {
    background-color: #00c3ff;
  }
</style>


