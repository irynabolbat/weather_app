import { createApp } from 'vue';
import App from './App.vue';
import 'vue-toast-notification/dist/theme-bootstrap.css';
import { setupRouter } from './router';
import { createPinia } from 'pinia';
import VueToast from 'vue-toast-notification';

const pinia = createPinia();
const app = createApp(App);

setupRouter(app);
app.use(pinia)
  .use(VueToast)
  .mount('#app');
