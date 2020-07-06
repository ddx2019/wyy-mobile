import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FastClick from "fastclick";
import VueLazyload from 'vue-lazyload'


import './assets/icon/iconfont.css' //字体图标

Vue.use(VueLazyload,{
  // error:require('@/assets/img/logo.png'),
  loading:require('@/assets/img/loading.gif')
})


//解决ios移动端input调软键盘问题
FastClick.prototype.focus = function(targetElement) {
  let length;
  let isIphone = navigator.userAgent.indexOf("iPhone") != -1;
  if (
    isIphone &&
    targetElement.setSelectionRange &&
    targetElement.type.indexOf("date") !== 0 &&
    targetElement.type !== "time" &&
    targetElement.type !== "month" &&
    targetElement.type !== "email"
  ) {
    length = targetElement.value.length;
    targetElement.setSelectionRange(length, length);
    /*修复bug ios 11.3不弹出键盘，这里加上聚焦代码，让其强制聚焦弹出键盘*/
    targetElement.focus();
  } else {
    targetElement.focus();
  }
};

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
