import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import store from "./store"
import toast from 'components/common/toast'

import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue();
//安装toast插件
Vue.use(toast)

//解决移动度那300延迟
FastClick.attach(document.body)

//图片懒加载
Vue.use(VueLazyLoad,{
  // loading:require ('assets/img/')
});

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
