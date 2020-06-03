// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './store'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import axios from './services/http.service'
import 'qiniu-js'
import pdf from './components/pdf'

//国际化
import VueI18n from 'vue-i18n'
import defineLanguage from './language/index'
import icn from 'iview/dist/locale/zh-CN';
import ien from 'iview/dist/locale/en-US';
import iindo from 'iview/dist/locale/id-ID';



Vue.use(pdf)

Vue.use(VueI18n)

function lang() {
// 将选择的语言存在localStorage中
    let t = window.localStorage.getItem('language')
    if (t) return t
    // 默认英文
    else return 'en'
}



const language = lang()

// 自定义 window 的 lang 属性
window.lang = lang()

Vue.locale = () => {}
const messages = {
  'en': Object.assign(defineLanguage.en, ien),
  'cn': Object.assign(defineLanguage.cn, icn),
  'indo': Object.assign(defineLanguage.indo, iindo),
}


// 创建一个 i18n 实例
const i18n = new VueI18n({
    locale: language,    // 语言标识
    messages
})

Vue.use(iView, {
    i18n: (key, value) => i18n.t(key, value)
})

// 将axios挂载到prototype上，在组件中可以直接使用this.axios访问
Vue.prototype.axios = axios;
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,//使用store
    i18n,
    axios,
    template: '<App/>',
    components: {App}
})
