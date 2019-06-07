import Vue from "vue";
import App from "./App.vue";
import Vuetify from 'vuetify';
import router from './router.js';
import store from './store.js';


import 'vuetify/dist/vuetify.min.css'

Vue.config.productionTip = false;

//axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com'
//axios.defaults.baseURL = 'https://localhost:8000'
//xios.defaults.baseURL =  'http://localhost:5656/api'
//login/user'

Vue.use(Vuetify);
Vue.use(router);

//Laburo con el token aca
const token = localStorage.getItem('user-token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");


/*new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
*/
