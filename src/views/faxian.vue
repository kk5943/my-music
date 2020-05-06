<template>
    <div class="faxian">
        <van-popup v-model="show"  position="left"
    :style="{ height: '98%' ,width: '82%'}"  round>
    
    <!-- 用户信息  登录后可见 -->

     <div class="user" v-if="userinfo.type==1" >
        <div class="top"> 
            <div class="img">
                <img :src="userinfo.profile.avatarUrl" alt="">
                <div>{{userinfo.profile.nickname}}</div>
            </div>
            <div class="btn">
                <van-button round icon="star-o" size="normal" type="danger">签到</van-button>
            </div>
        </div>
        <div class="cont">
            <div>
                <span class="iconfont icon-xiaoxi"></span>
                <div>消息</div>
            </div>
            <div>
                <span class="iconfont icon-faxian1"></span>
                <div>好友</div>
            </div>
            <div>
                <span class="iconfont icon-pifu2"></span>
                <div>皮肤</div>
            </div>
            <div>
                <span class="iconfont icon-yinyue"></span>
                <div>听歌识曲</div>
            </div>
        </div>

    </div>


    
    <div class="login" v-else>
        <div class="login-title">登录网易云音乐</div>
        <div class="login-title">手机电脑多端同步，尽享海量高品质音乐</div>
        <div class="txt" @click="gologin">立即登录</div>
    </div>

    
 <div class="iconbox">
        <div> <span class="iconfont icon-yanchu"></span> <span class="text">演出</span> </div> 
        <div> <span class="iconfont icon-gouwuche"></span> <span class="text">商城</span> </div> 
        <div> <span class="iconfont icon-location"></span> <span class="text">附近的人</span> </div> 
        <div> <span class="iconfont icon-icon--"></span> <span class="text">口袋铃声</span> </div> 
        <div> <span class="iconfont icon-dingdan1"></span> <span class="text">我的订单</span> </div> 
 </div>


<div class="bottom">
<div class="top"> <span class="iconfont icon-icon-test"></span> <span class="text">定时停止播放</span>  </div>
<div class="ft">
    <div> <span class="iconfont icon-yejianmoshi"></span> <span class="text">夜间模式</span> </div> 
     <div> <span class="iconfont icon-shezhi"></span> <span class="text">设置</span> </div> 
    <div> <span class="iconfont icon-tuichu"></span> <span class="text" @click="clearlog">退出</span> </div> 
</div>
</div> 


 </van-popup>
 <van-nav-bar title="发现音乐" left-text="返回" fixed>
  <span class="iconfont icon-huaban" slot="right" @click="$router.push('/search')"></span>
 <span class="iconfont icon-caidan1"  slot="left" @click="showPopup"></span>
</van-nav-bar>

<van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
  <van-swipe-item v-for="(img,index) in banners" :key="index">
      <img :src="img.pic" alt="" class="banners">
  </van-swipe-item>
    </van-swipe>

    <div class=" logiconbox">
        <div class="icon-item" @click="gogedan('4869164805','每日推荐')">
            <span class="iconfont icon-yinle"></span>
            <p>每日推荐</p>
        </div>
        <div  class="icon-item" @click="$router.push('/gedans')">
            <span class="iconfont icon-gedan"></span>
            <p>歌单</p>
        </div>
        <div  class="icon-item" @click="$router.push('/tophot')">
            <span class="iconfont icon-paixingbang"></span>
            <p>排行榜</p>
        </div>
        <div  class="icon-item" @click="$router.push('/diantai')">
            <span class="iconfont icon-erji"></span>
            <p>电台</p>
        </div>
        <div  class="icon-item">
            <span class="iconfont icon-diantai" @click="gogedan('460742530','选自山丘电台%20持续更新中')"></span>
            <p>私人FM</p>
        </div>
        </div>
                    <!-- 歌单 -->
         <div class="tuijiangedan">
            <div>推荐歌单</div>
            <div class="btn" @click="$router.push('/gedans')">歌单广场</div>
        </div>
        <van-swipe class="" :show-indicators='false'>
        <van-swipe-item>
            <div class="gedan-box">
            <div class="item itemgedan" v-for="(item,index) in gedanlist" :key="index" @click="gogedan(item.id,item.name)">
                <img :src="item.picUrl" alt="">
                <div>{{item.name}}</div>
                <span class="iconfont icon-play3">{{ item.playCount >= 100000 ? parseInt(item.playCount/10000) +'万' : item.playCount }} </span>
            </div>
             </div>
        </van-swipe-item>
        <van-swipe-item>
             <div class="gedan-box">
            <div class="item itemgedan" v-for="(item,index) in gedanlist2" :key="index" @click="gogedan(item.id,item.name)">
                <img :src="item.picUrl" alt="">
                <div>{{item.name}}</div>
                <span class="iconfont icon-play3">{{ item.playCount >= 100000 ? parseInt(item.playCount/10000) +'万' : item.playCount }} </span>
            </div>
        </div>
        </van-swipe-item>
        
        </van-swipe>

       
        <!-- 推荐歌曲 -->

         <div class="tuijiangedan">
            <div><span>新歌</span>/ <span>新碟</span> </div>
            <div class="btn">更多新歌</div>
        </div>
        <van-swipe class=""  indicator-color="white">
        <van-swipe-item>
             <div class="music-box">
                <div  v-for="(item,index) in newmusic" :key="index" class="item" @click="tomusicplay(item.id)">
                    <img :src="item.picUrl" alt="">
                
                        <div class="txt">{{item.name}} <span style="color:#666;font-size:14px">{{'--'+item.song.artists[0].name}}</span> </div>
                        
                
                    <div class="log"> <img src="../assets/bofang.png" alt=""></div>
                </div>
            </div>
        </van-swipe-item>
        <van-swipe-item>
             <div class="music-box">
                <div  v-for="(item,index) in newmusic2" :key="index" class="item ">
                    <img :src="item.picUrl" alt="">
                
                        <div class="txt">{{item.name}} <span style="color:#666;font-size:14px">{{'--'+item.song.artists[0].name}}</span> </div>
                        
                
                    <div class="log"> <img src="../assets/bofang.png" alt=""></div>
                </div>
            </div>
        </van-swipe-item>
        </van-swipe>
       

          <div class="tuijiangedan">
            <div>最新MV</div>
            <div class="btn" @click="$router.push('/MV')">更多MV</div>
        </div>
         <div class="gedan-box">
            <div class="item" v-for="(item,index) in mvlist" :key="index">
                <img :src="item.cover" alt="">
                <div>{{item.name}}</div>
                <div></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
         data(){
    return{
      active: 'faxian',
        show: false,
        banners:[],
        gedanlist:[],
        newmusic:{},
        mvlist:[],
        newmusic2:[],
        gedanlist2:[],
        userinfo:{},
        name:{}
     
    }
  },
    methods: {
    showPopup() {
      this.show = true;
    },
    getgedanlist(){
        this.$http.get('/personalized?limit=13').then(res=>{
            this.gedanlist =res.data.result.slice(0,6)
            this.gedanlist2 =res.data.result.slice(7,13)
            // console.log(this.gedanlist)
        })
    },
    getnewmusic(){
         this.$http.get('/personalized/newsong').then(res=>{
            this.newmusic =res.data.result.slice(0,3);
            this.newmusic2=res.data.result.slice(4,7)
            // console.log(this.newmusic)
        })
         this.$http.get('/mv/first?limit=10').then(res=>{
            this.mvlist =res.data.data.slice(3,7)
            // console.log(res)
        })
    },
    gologin(){
        this.$router.push('/gologin')
    },
    gogedan(gedanid,iname){
         this.$router.push({path:'/gedanxq',query:{id:gedanid,name:iname}})
    },
    tomusicplay(id){
        this.$store.state.id =id
         this.$store.state.boxshow =true
        //  this.$router.push({path:'/play',query:{id:id,}})  
    },
    clearlog(){
        window.sessionStorage.clear()
        this.$store.state.user.profile.nickname = {}
        this.$store.state.user.profile.avatarUrl=  {}
        this.$store.state.user.userId={}
         this.$store.state.user.type=0
         this.$toast('退出登录成功');
         this.$router.push('/faxian')
    }
  },
   created(){
       this.$http.get('/banner?type=2').then(res=>{
           this.banners =res.data.banners
       
       })
       this.getgedanlist()
       this.getnewmusic()
       this.userinfo =this.$store.state.user
    //    console.log(this.$store.state.user ,this.$store,this.name)
   }

    }
</script>

<style lang="less" scoped>
.faxian{
    padding-bottom:50px;
}
.cont{
   
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    margin: 25px 0;
    border-bottom: 1px solid #eee;
    >div{
        flex:1;
        span{
            font-size: 22px;
            color: red;
        }
        div{
            font-size: 14px;
            margin-bottom: 15px;
        }
    }
}
.bottom{
    position: absolute;
    width: 100%;
    bottom: 0px;
    margin:25px 0;
    .iconfont{
        font-size: 25px;
    }
    .top{
         line-height: 45px;
        padding-left: 15px;
    }
    .ft{
        padding:0 15px;
        display: flex;
        justify-content: space-between;
        .text{
        font-size: 16px;
    }
    }
}

.login{
  width: 100%;
  height: 30%;
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
.banners{
    width: 100%;
}
.my-swipe{
    
    margin:50px 10px 10px 10px
}

 .tuijiangedan{
     display: flex;
     justify-content: space-between;
     margin: 10px;
      font-size: 16px;
    font-weight: 700;
     .btn{
         font-size: 13px;
         line-height: 20px;
         color: #666;
         border:1px solid #666;
         padding:2px 10px;
         border-radius: 1rem;
     }

 }
 
 .music-box{
     padding:10px;
     .item{
         width: 100%;
         display: flex;
         align-items: center;
         justify-content: space-between;
         text-align: left;
         img{
             width: 70px;
             height: 70px;
             border-radius: 10px;
             margin:10px
         }
         .txt{
             overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            width: 80%;
         }
        .log{
         
                img{
                width: 14px;
                height: 14px;
                border:1px solid #dde;
                padding:5px;
                border-radius: 50%;

            }
            
            
        }

     }
 }

</style>