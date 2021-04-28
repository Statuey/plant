import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueRouter from 'vue-router';
import store from './store'
import vuetify from './plugins/vuetify';
Vue.use(VueRouter);

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '</App>',
  vuetify,
  render: h => h(App)
}).$mount('#app')
