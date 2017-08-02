import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import stores from './store/store'
import VueRouter from 'vue-router'
import filters from './filters'
import routes from './config.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

require('../assets/css/page.css');
Vue.use(VueRouter)
Vue.use(ElementUI);


Object.keys(filters).forEach(key => Vue.filter(key, filters[key]));


const router = new VueRouter({
  routes
});
router.afterEach((to, from, next) => {
  document.title = to.name;
})


Vue.prototype.$http = axios;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.baseURL = document.location.origin + '/';

new Vue({
  el: '#app',
  router,
  store: stores,
  render: h => h(App)
})
