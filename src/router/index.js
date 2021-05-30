import {
  createRouter,
  createWebHistory
} from 'vue-router';

import Home from '../pages/Home.vue';
import Login from '../pages/Login.vue';
import Signup from '../pages/Signup.vue';
import Dashboard from '../pages/Dashboard.vue';
import New from '../pages/New.vue';
import Dataset from '../pages/Dataset.vue';
import Identify from '../pages/Identify.vue';
import Unchecked from '../pages/Unchecked.vue';
import Samples from '../pages/Samples.vue';
import Settings from '../pages/Settings.vue';
import About from '../pages/About.vue';
import Modelboard from '../pages/Modelboard.vue';
import Newmodel from '../pages/Newmodel.vue';
import Modelset from '../pages/Modelset.vue';
import Publicdata from '../pages/Publicdata.vue';
import Publicmodel from '../pages/Publicmodel.vue';

const routes = [{
    path: '/',
    component: Home,
  },
  {
    path: '/about',
    component: About,
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
    path: '/modelboard',
    component: Modelboard,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: '/newmodel',
    component: Newmodel,
    meta: {
      requireAuth: true,
    }
  },
  {
    path: '/datasets/:datasetId',
    component: Dataset,
    children: [{
        path: '',
        component: Samples,
      },
      {
        path: 'unchecked',
        component: Unchecked,
      },
      {
        path: 'settings',
        component: Settings,
        meta: {
          requireAuth: true,
        },
      },
    ],
  },
  {
    path: '/modelsets/:modelsetId',
    component: Modelset,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: '/identify',
    component: Identify,
  },
  {
    path: '/publicData',
    component: Publicdata,
  },
  {
    path: '/publicModel',
    component: Publicmodel,
  }
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