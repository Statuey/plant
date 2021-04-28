import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/home.vue'
import database from '../views/database.vue'
import download from '../views/download.vue'
import login from '../views/login.vue'
import register from '../views/register.vue'
import tutorial from '../views/tutorial.vue'
import index from '../views/index.vue'

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
    path: '/database',
    name: 'database',
    component: database
  },
  {
    path: '/download',
    name: 'download',
    component: download
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
    path: '/tutorial',
    name: tutorial,
    component: tutorial
  }
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
      next("/login")
    }
  } else {
    next();
  }
});


export default router