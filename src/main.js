import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import miligram from 'milligram'


window.api = axios.create({
  baseURL: 'https://allweb.fun/coop/api',
  headers: { Authorization: 'a3d06b8fb2acb4f80bfbc3ed1e2b65d994267a07' }
});
Vue.config.productionTip = false

Vue.prototype.$bus = new Vue();

new Vue({
  beforeCreate() {
    api.interceptors.request.use(config => {
        if(this.$store.state.token) {
            config.url+='?token='+this.$store.state.token
        }
        return config;
    })
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app')
