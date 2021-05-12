import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/home.vue'

import download from '../views/download.vue'
import login from '../views/login.vue'
import register from '../views/register.vue'
import testDatabase from '../views/testDatabase.vue'
import index from '../views/index.vue'
import trainManagement from '../views/trainManagement.vue'
import testManagement from '../views/testManagement.vue'
import lesionsManagement from '../views/lesionsManagement.vue'
import testEnhance from '../views/testEnhance.vue'
import modelManangement from '../views/modelManangement'

Vue.use(VueRouter)

const routes = [{
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/register',
    name: 'register',
    component: register
  },
  {
    path: '/',
    name: 'index',
    component: index
  },
  {
    path: '/database/trainManagement',
    name: 'trainManagement',
    meta: {
      requireAuth: true
    },
    component: trainManagement,
  },
  {
    path: '/database/testDatabase',
    name: 'testDatabase',
    meta: {
      requireAuth: true
    },
    component: testDatabase,
  },
  {
    path: '/database/lesionsManagement',
    name: 'lesionsManagement',
    meta: {
      requireAuth: true
    },
    component: lesionsManagement,
  },
  {
    path: '/model/modelManangement',
    name: 'modelManangement',
    meta: {
      requireAuth: true
    },
    component: modelManangement,
  },
  {
    path: '/model/testEnhance',
    name: 'testEnhance',
    meta: {
      requireAuth: true
    },
    component: testEnhance,
  },
  {
    path: '/download',
    name: 'download',
    component: download,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/home',
    name: 'home',
    component: home,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/testManagement',
    name: 'testManagement',
    component: testManagement,
    meta: {
      requireAuth: true
    }
  },
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    //need to login
    const token = localStorage.getItem("access_token")
    if (token) {
      next()
    } else {
      next("/")
    }
  } else {
    next();
  }
});


export default router