import { createRouter, createWebHistory } from 'vue-router';

import Home from '../pages/Home.vue';
import Login from '../pages/Login.vue';
import Signup from '../pages/Signup.vue';
import Dashboard from '../pages/Dashboard.vue';
import New from '../pages/New.vue';
import Dataset from '../pages/Dataset.vue';

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/signup',
    component: Signup,
  },
  {
    path: '/dashboard',
    component: Dashboard,
  },
  {
    path: '/new',
    component: New,
  },
  {
    path: '/datasets/:datasetId',
    component: Dataset,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
