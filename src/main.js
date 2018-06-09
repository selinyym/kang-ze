import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store/index'
import fastclick from 'fastclick'
import 'lib-flexible/flexible'
import 'common/sass/_index.scss'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueLazyload from 'vue-lazyload'

Vue.use(VueAwesomeSwiper)

Vue.use(VueLazyload, {
  loading: require('common/image/defaultImg.jpg'),
  error: require('common/image/defaultImg.jpg')
})

fastclick.attach(document.body)

Vue.config.productionTip = false
Vue.prototype.$http=axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  data: {
    eventHub: new Vue()
  }
})
