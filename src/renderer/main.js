import Vue from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'
import 'vue2-timepicker/dist/VueTimepicker.css'
import './assets/style/main.scss'
import App from './App'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'
import VueDaval from 'vue-daval'
import Paginate from 'vuejs-paginate'
import { FormDatepickerPlugin } from 'bootstrap-vue'
import VueTimepicker from 'vue2-timepicker'

Vue.component(FormDatepickerPlugin)
Vue.component('paginate', Paginate)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(Vuelidate)
Vue.use(VueDaval)
Vue.use(VueTimepicker)
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
