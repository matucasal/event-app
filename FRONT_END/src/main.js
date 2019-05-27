import Vue from "vue";
import App from "./App.vue";
import Vuetify from 'vuetify';
import router from './router.js';

import 'vuetify/dist/vuetify.min.css'

Vue.config.productionTip = false;

Vue.use(Vuetify);
Vue.use(router);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");

