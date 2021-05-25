import { createRouter, createWebHistory } from 'vue-router';

import Home from '../pages/Home.vue';
import Login from '../pages/Login.vue';
import Signup from '../pages/Signup.vue';
import Dashboard from '../pages/Dashboard.vue';
import New from '../pages/New.vue';
import Dataset from '../pages/Dataset.vue';
import Identify from '../pages/Identify.vue';
import Unchecked from '../pages/Unchecked.vue';

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
    meta: {
      requireAuth: true,
    },
  },
  {
    path: '/new',
    component: New,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: '/datasets/:datasetId',
    component: Dataset,
  },
  {
    path: '/identify',
    component: Identify,
  },
  {
    path: '/datasets/:datasetId/unchecked',
    component: Unchecked,
    meta: {
      requireAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    const token = localStorage.getItem('accessToken');
    if (token) {
      next();
    } else {
      next('/');
    }
  } else {
    next();
  }
});

export default router;
