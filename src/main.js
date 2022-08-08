import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '../public/styles/css/common.scss'

import '@/styles/index.scss' // global css
import './icons' // icon
import './permission' // permission control

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '../public/styles/iconfont/iconfont.css';
Vue.use(ElementUI);



import mitt from 'mitt';
const emitter = mitt();

// import * as LottiePlayer from "@lottiefiles/lottie-player";
// Vue.use(LottiePlayer)
import LottieIcon from '../packages/components/lottie/index'
Vue.use(LottieIcon)

// mavonEditor   MD编辑器
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  console.log(11111)
  const { mockXHR } = require('../mock')
  mockXHR()
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
export {
    emitter
}
