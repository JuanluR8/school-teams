import Vue from 'vue';
import App from './App.vue';
import router from './router';

import VueTailwind from 'vue-tailwind';
import 'tailwindcss/dist/base.css';
import 'tailwindcss/dist/components.css';
import 'tailwindcss/dist/utilities.css';

import { getLocalStorage, initializeLocalStorage } from './helpers/localStorage';
import { isEmpty } from 'ramda/es';

Vue.config.productionTip = false;

Vue.use(VueTailwind)

if (isEmpty(getLocalStorage)) {
  initializeLocalStorage();
}

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
