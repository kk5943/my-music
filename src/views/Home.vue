<template>
  <div class="home">
    
   <van-tabbar v-model="active" active-color="red" router>
  <van-tabbar-item name='/faxian' to='/faxian' >
    <van-icon class="iconfont  icon-faxian1"  slot="icon" ></van-icon>
    <span>发现</span>
  </van-tabbar-item>
  <van-tabbar-item name='/MV' to='/MV'>
      <van-icon class="iconfont  icon-shipin1"  slot="icon"></van-icon>
      <span>MV</span>
  </van-tabbar-item>
  <van-tabbar-item name='/yuncun' @click="tishi">
      <van-icon class="iconfont  icon-pengyouquan"  slot="icon"></van-icon>
      <span>云村</span>
  </van-tabbar-item>
  <van-tabbar-item name='/wode' to='/wode'>
      <van-icon class="iconfont  icon-yonghu"  slot="icon"></van-icon>
      <span>我的</span>
  </van-tabbar-item>
</van-tabbar>
 
 
 <div class="music" @click="showPopup" v-if="$store.state.name"> 
   <img  :src="$store.state.imgurl" alt="">
   <div> {{$store.state.name}}- <span>{{$store.state.arname}}</span></div>
  
 </div>
 <van-popup v-model="$store.state.boxshow"  position="bottom"
  :style="{ height: '100%' }">
  <Music @hide='hide'></Music>
  </van-popup>
  
 

<router-view></router-view>

  </div>

</template>

<script>
// @ is an alias to /src
import Music from '@/components/play.vue'

export default {
  name: 'Home',
  components: {
   Music,
  },
  data(){
    return{
      active: this.$route.fullPath,
      show: false,
       
    }
  },
    methods: {
       showPopup() {
      // this.show = true;
      this.$store.state.boxshow=true
    },
    hide(){
      this.$store.state.boxshow=false
    },
    tishi(){
      this.$toast('页面开发中')
    }
  },
  created(){
    // this.$http.get(`/login/cellphone?phone=17307238909&password=8909kelly`).then(res=>{
    //   console.log(res)
    // })
    // console.log(this.$route)
  }
}
</script>

<style  lang='less' scoped>

.iconfont{
  font-size: 20px;
}
.music{
  padding: 5px 15px;
  position: fixed;
  z-index: 99;
  bottom:50px;
  background:rgba(0, 0, 0, 0.4);
  width: 100%;
  display: flex;
  align-items: center;
  img{
    width:30px;
    height: 30px;
    border-radius: 50%;
    margin:0 15px
  }
  div{
    color: #fff;
    span{
      color: #eee;
      font-size: 12px;
    }
  }
}
</style>