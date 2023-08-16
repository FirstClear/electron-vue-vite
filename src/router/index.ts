import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: '/',
    name: 'landing-page',
    component: ()=>import('@/components/LandingPage.vue')
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
