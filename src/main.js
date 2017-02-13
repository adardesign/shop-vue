import Vue from 'vue'
import accounting from 'accounting'
import pluralize from 'pluralize'
import Shop from './components/shop/Shop'
import store from './store'
import router from './routes'
import VueRouter from 'vue-router'

//Vue.use(VueRouter)


Vue.filter('formatMoney', accounting.formatMoney)
Vue.filter('pluralize', pluralize)

new Vue({
  el: '#shop',
  store,
  router,
  render: h => h(Shop)
})
