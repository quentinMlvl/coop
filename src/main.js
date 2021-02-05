import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import miligram from 'milligram'


window.api = axios.create({
  baseURL: 'https://tools.sopress.net/iut/coop/api',
  headers: { Authorization: '3b5286b512844092ef2ad7c2d256073d6a64f069' }
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
