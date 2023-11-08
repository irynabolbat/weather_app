import { createApp } from 'vue';
import App from './App.vue';
import { setupRouter } from './router';
import { createPinia } from 'pinia';
import Toaster from '@meforma/vue-toaster';

const pinia = createPinia();
const app = createApp(App);

setupRouter(app);
app.use(pinia)
  .use(Toaster)
  .mount('#app');
