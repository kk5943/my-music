import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import faxian from '../views/faxian.vue'
import gologin from '../views/login/gologin.vue'
import login from '../views/login/login.vue'
import sign from '../views/login/sign.vue'
import search from '../views/search/search.vue'
import musiclist from '../views/musiclist.vue'
import MV from '../views/MV.vue'
import gedans from '../views/gedan/gedans.vue'
import gedanxq from '../views/gedan/gedanxq.vue'
import mvdetail from '../views/videomvs/mvdetail.vue'
import play from '../components/play.vue'
import tophot from '../views/tophot.vue'
import wode from '../views/wode.vue'
import diantai from '../views/diantai/diantai.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/faxian',
    children:[
      {path:'/faxian',component: faxian },
      {path:'/search',component: search },
      {path:'/musiclist', name:'musiclist',component: musiclist },
      {path:'/MV', name:'MV',component: MV },
      {path:'/gedans', name:'gedans',component: gedans },
      {path:'/gedanxq', name:'gedanxq',component: gedanxq },
      {path:'/tophot', name:'tophot',component: tophot },
      {path:'/wode', name:'wode',component: wode },
      {path:'/diantai', name:'diantai',component: diantai },

    ]

  },
  {
    path: '/gologin',
    name: 'gologin',
    component: gologin,
  },
  {
    path: '/login',
    name: 'login',
    component: login,
  },
  {
    path: '/sign',
    name: 'sign',
    component: sign,
  },
  {
    path: '/mvdetail',
    name: 'mvdetail',
    component: mvdetail,
  },
  {
    path: '/play',
    name: 'play',
    component: play,
    meta:{
      keepAlive: true, //此组件要被缓存
    },
  }
  // {
  //   path: '/about',
  //   name: 'About',
   
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
