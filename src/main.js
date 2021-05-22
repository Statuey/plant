import { createApp } from 'vue';
import App from './App.vue';
import VueAxios from 'vue-axios';
import router from './router';
import axios from 'axios';
import humps from 'humps';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn');
dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);

const app = createApp(App);

const api = axios.create({
  transformResponse: [
    ...axios.defaults.transformResponse,
    (data) => humps.camelizeKeys(data),
  ],
  transformRequest: [
    (data) => humps.decamelizeKeys(data),
    ...axios.defaults.transformRequest,
  ],
});

const accessTokenHistory = localStorage.getItem('accessToken');

if (accessTokenHistory) {
  api.defaults.headers.common = {
    Authorization: `Bearer ${accessTokenHistory}`,
  };
}

app.use(router);
app.use(VueAxios, api);

app.mount('#app');
