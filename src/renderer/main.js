import Vue from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'
import './assets/style/main.scss'
import App from './App'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'
import VueDaval from 'vue-daval'
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(Vuelidate)
Vue.use(VueDaval)
// Vue.use(window.vuelidate.default)
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-enable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
