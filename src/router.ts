import { createRouter, createWebHistory } from 'vue-router';
import MainComponent from './components/MainComponent.vue';
import FavoriteComponent from './components/FavoriteComponent.vue';
import type { App } from 'vue';

const routes = [
  { path: '/', component: MainComponent },
  { path: '/favorite', component: FavoriteComponent },
];

export function setupRouter(app: App<Element>) {
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });

  app.use(router);
}
