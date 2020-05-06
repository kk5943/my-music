import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import Vant from 'vant'
import 'vant/lib/index.css'
import './assets/gol.less'
import './assets/font/iconfont.css'

Vue.use(Vant)
Vue.filter('time', function(mss) {
    var d = new Date(mss)
    var year = d.getFullYear()
    var month = d.getMonth() + 1
    var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate()
    var hour = d.getHours()
    var minutes = d.getMinutes()
    var seconds = d.getSeconds()
    return year + '-' + month + '-' + day
})
Vue.filter('date', function(mss) {
    var hours =
        parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) < 10 ?
        '0' + parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) :
        parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    var minutes =
        parseInt((mss % (1000 * 60 * 60)) / (1000 * 60)) < 10 ?
        '0' + parseInt((mss % (1000 * 60 * 60)) / (1000 * 60)) :
        parseInt((mss % (1000 * 60 * 60)) / (1000 * 60))
    var seconds = (mss % (1000 * 60)) / 1000 < 10 ? '0' + parseInt((mss % (1000 * 60)) / 1000) : parseInt((mss % (1000 * 60)) / 1000)
    return minutes + ':' + seconds
})

// https://autumnfish.cn
Vue.config.productionTip = false

axios.defaults.baseURL = 'https://autumnfish.cn'
    // axios.interceptors.request.use((config) => {
    //     config.headers.Authorization = window.sessionStorage.getItem('token')
    //     return config
    // })

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

Vue.prototype.$http = axios

new Vue({
    router,
    store,
    render: (h) => h(App)
}).$mount('#app')