<template>
    <div class="wodebox">   
       
         <div class="top"  v-if="userinfo.type==1"> 
         <div>
             <div class="top">
                <div class="item left">
                    <img :src="userinfo.profile.avatarUrl" alt="">
                </div>
                <div class="right item">
                <div class="name">{{userinfo.profile.nickname}}</div>
                <span class="vip">LV0</span>
                </div>
                 <van-button round icon="star-o" size="small" type="danger" disabled>签到</van-button>
                 <!-- <van-button round icon="star-o" size="small" type="danger">签到</van-button> -->
              </div>
           
                <img :src="userinfo.profile.avatarUrl" alt="" class="bg">
             </div> 
        
          </div>    
           <div class="login" v-else>
        <div class="login-title">登录网易云音乐</div>
        <div class="login-title">手机电脑多端同步，尽享海量高品质音乐</div>
        <div class="txt" @click="$router.push('/gologin')">立即登录</div>
         </div>
         
         <div class="logiconbox">
        <div class="icon-item">
            <span class="iconfont icon-yinle"></span>
            <p>私藏推荐</p>
        </div>
        <div  class="icon-item" >
            <span class="iconfont icon-yinle1"></span>
            <p>最新电音</p>
        </div>
        <div  class="icon-item" >
            <span class="iconfont icon-paixingbang"></span>
            <p>排行榜</p>
        </div>
        <div  class="icon-item">
            <span class="iconfont icon-diantai"></span>
            <p>爵士电台</p>
        </div>
        <div  class="icon-item">
            <span class="iconfont icon-diantai"></span>
            <p>私人FM</p>
        </div>
        </div>


          <div class="icon-cont">
        <div class="icon-item">
            <span class="iconfont icon-gedan"></span>
            <p>本地音乐<span>(0)</span> </p>
        </div>
        <div  class="icon-item" @click="showPopup">
            <span class="iconfont icon-bofang2"></span>
            <p>最近播放<span>({{recently.length}})</span> </p>
        </div>
        <div  class="icon-item" >
            <span class="iconfont icon-xiazai"></span>
            <p>下载管理<span>(0)</span></p>
        </div>
        <div  class="icon-item">
            <span class="iconfont icon-diantai"></span>
            <p>我的电台<span>(0)</span></p>
        </div>
        <div  class="icon-item">
            <span class="iconfont icon-shoucang1"></span>
            <p>我的收藏<span>(0)</span></p>
        </div>
        </div>

        <van-popup v-model="show" round position="bottom"
  :style="{ height: '70%' }">
  
       
      <div class='list-title' v-if="recently">
        <span class="iconfont icon-danquxunhuan" v-if="this.$store.state.for" @click="totalfor">
          <span class="xunhuan">单曲循环</span>
        </span>
         <span class="iconfont icon-liebiaoxunhuan" v-else @click="totalfor" >
           <span class="xunhuan"> 列表循环</span>
          </span> 
            <span class="txt">（共{{recently.length}}首）</span></div>
      <div v-for="(item,index) in recently" :key="index" class="listbox" >
                <div class="left">
                    <div class="name">{{item.song.name}}</div>
                    <div class="geshou"> 
                     <span v-if="item.fee==8" class="sq">SQ </span>
                     {{item.song.ar[0].name}} 
                     <span v-if="item.song.al.name">
                         {{ '-'+item.song.al.name}}</span>
                      
                     </div>
      </div>
     <div class="log">
         <span v-if="item.song.mv!= 0" class="iconfont icon-MV"></span> 
         <span class="iconfont icon-bofang2" @click="tomusicplay(item.song.id ,index)"></span>
       </div>
         </div>
  </van-popup>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                userinfo:{},
                recently:[],
                 show:false,
                 xunhuan:false,
               
            }
        },
        created(){
            this.userinfo =this.$store.state.user
             this.$http.get(`/user/record?uid=${this.userinfo.userId}&type=1`).then(res=>{
                 this.recently=res.data.weekData
                console.log(res)
            })   
           
            
        },
        methods:{
            totalfor(){
           this.$store.state.for =!this.$store.state.for
           this.xunhuan =!this.xunhuan
             if(this.xunhuan){this.$toast('单曲循环')}else{
               this.$toast('列表循环')
             }
          //  console.log(  this.$store.state.for)
         },
          showPopup() {
         this.show = true;
         },
          tomusicplay(id ,index){
           const songlist =[]
            for (let i=0; i<this.recently.length; i++){
                songlist.push(this.recently[i].song)
            }
            
             this.$store.state.songlist=songlist
             this.$store.state.index=index
             this.$store.state.id =id
             this.$store.state.boxshow =true
             console.log(this.$store.state.songlist ,index)
        
             }
        }
    }
</script>

<style lang='less' scoped>
.wodebox{
    width: 100%;
    overflow: hidden;
}

.top{
    display: flex;
    // justify-content: space-between;
    align-items: center;
     position: relative;
     z-index: 9;
   overflow: hidden;
   .left{
        img{
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }
   }
    .right{
        .name{
            color: #eee;
            font-size: 17px;
        }
        .info{
            display: flex;
            align-items: center;
            margin: 10px 0;  
        }
         .vip{
                background: rgba(0,0,0,0.25);
                color: #eee;
                padding: 2px 10px;
                font-size: 8px;
                border-radius: 7px;
                margin: 10px 0;
                font-style:oblique;
            }
        
    }
}

.bg{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
     background-repeat: no-repeat;
    background-size: cover;
    background-position: 50%;
    -webkit-filter: blur(20px);
    filter: blur(35px);
    -webkit-transform: scale(1.5);
    -ms-transform: scale(1.5);
    transform: scale(1.5);
    background-color: rgba(0,0,0,0.25)
    
}
.van-button--round{
    margin-left: 100px;
}
.login{
  width: 100%;
  height: 105px;
 background-color: hsla(0,0%,80%,.3);
   text-align: center;
   padding-top: 20px;
}
.login .txt{
  padding:7px;
  border:1px  solid #666;
  border-radius: 10px;
  font-size: 14px;
  width: 30%;
  color: #666;
  border-color: #666;
  text-align: center;
  margin: 10px auto;
}
.login-title{
  width: 100%;
  font-size: 14px;
  color: #666;
  margin-left:10px;
}
.icon-cont{
    .icon-item{
        color: #333;
        display: flex;
        align-items: center;
        font-size: 16px;
        padding: 12px;
        border-bottom: 1px solid #eee;
        span{
            font-size: 24px;
            margin-right: 10px;
        }
        p{

            span{
                font-size: 14px;
                color: #666;
            }
        }
    }
}
</style>