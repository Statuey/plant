import { createApp } from 'vue';
import { createStore } from 'vuex';
import App from './App.vue';
import VueAxios from 'vue-axios';
import router from './router';
import axios from 'axios';
import humps from 'humps';
import dayjs from 'dayjs';
import vClickOutside from 'click-outside-vue3';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn');
dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);

const app = createApp(App);

app.use(vClickOutside);

const api = axios.create({
  transformResponse: [
    ...axios.defaults.transformResponse,
    (data) =>
      humps.camelizeKeys(data, (key, convert, options) => {
        return /^[a-zA-Z0-9]{22}$/.test(key) ? key : convert(key, options);
      }),
  ],
  transformRequest: [
    (data) => {
      if (data instanceof FormData) {
        return data;
      }
      return humps.decamelizeKeys(data, (key, convert, options) => {
        return /^[a-zA-Z0-9]{22}$/.test(key) ? key : convert(key, options);
      });
    },
    ...axios.defaults.transformRequest,
  ],
});

const accessTokenHistory = localStorage.getItem('accessToken');

if (accessTokenHistory) {
  api.defaults.headers.common = {
    Authorization: `Bearer ${accessTokenHistory}`,
  };
}

const store = createStore({
  state() {
    return {
      user: {
        username: localStorage.getItem('user'),
        id: localStorage.getItem('userId'),
      },
    };
  },
  mutations: {
    login(state, user) {
      state.user = user;
    },
    logout(state) {
      state.user = {
        username: undefined,
        id: undefined,
      };
    },
  },
});

app.use(router);
app.use(store);
app.use(VueAxios, api);

app.mount('#app');
