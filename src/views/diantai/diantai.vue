<template>
    <div> 
        <div class="djnav">
            <span class="iconfont icon-fanhui" @click="$router.go(-1)"></span>
            <div>电台</div> 
        </div>
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
  <van-swipe-item v-for="(img,index) in banners" :key="index">
      <img :src="img.pic" alt="" class="banners">
  </van-swipe-item>
     </van-swipe>
        <div class="tuijiangedan">
            <div><span>热门DJ</span> </div>
            <div class="btn">更多热门DJ</div>
        </div>
         <div class="gedan-box">
                    <div class="item itemgedan" v-for="(item,index) in hotlist" :key="index" @click="gogedan(item.id,item.name)">
                        <img :src="item.picUrl" alt="">
                        <div v-if="item.name">{{item.name}}</div>
                        <div v-else>{{item.name}}</div>
                        <span style="background:rgba(0,0,0,0.5);padding:2px 5px">{{item.copywriter}} </span>
                    </div>
         </div>
        <div class="title">推荐电台</div>
         <div class="gedan-box">
                    <div class="item itemgedan" v-for="(item,index) in diantailist" :key="index" @click="gogedan(item.id,item.name)">
                        <img :src="item.picUrl" alt="">
                        <div v-if="item.description">{{item.description}}</div>
                        <div v-else>{{item.name}}</div>
                        <span style="background:rgba(0,0,0,0.5);padding:2px 5px">{{item.copywriter}} </span>
                    </div>
         </div>
           <div class="title">精彩节目推荐</div>
         <div class="gedan-box">
                    <div class="item itemgedan" v-for="(item,index) in diantailist1" :key="index" @click="gogedan(item.id,item.name)">
                        <img :src="item.blurCoverUrl" alt="">
                        <div v-if="item.name">{{item.name}}</div>
                        <div v-else>{{item.name}}</div>
                        <span style="background:rgba(0,0,0,0.5);padding:2px 5px">{{item.reason}} </span>
                    </div>
         </div>
          
    </div>
</template>

<script>
    export default {
        data(){
          return{
                diantailist:[],
                diantailist1:[],
                hotlist:[],
                banners:[]
          }
        },
        methods:{
             gogedan(gedanid ,name){
                console.log(gedanid ,name)
             this.$router.push({path:'/gedanxq',query:{id:gedanid ,iname:name}})
             }
        },
        created(){
            this.$http.get(`/personalized/djprogram`).then(res=>{
                this.diantailist=res.data.result.slice(0,3)
                console.log( res)
            })
              this.$http.get(`/program/recommend`).then(res=>{
                this.diantailist1=res.data.programs.slice(0,6)
                console.log( res)
            })
              this.$http.get(`/dj/hot`).then(res=>{
                this.hotlist=res.data.djRadios.slice(0,3)
                console.log( res)
            })
              this.$http.get(`/dj/banner`).then(res=>{
                this.banners=res.data.data
                // console.log( res)
            })
            
           
        }
        
    }
</script>

<style lang='less' scoped>
.gedan-box{
 padding-bottom: 5px;
}
.banners{
    width: 100%;
}
.my-swipe{
    
    margin:10px ;
    margin-top:40px
}
.djnav{
    position: fixed;
    width: 100%;
    z-index: 99;
    background: #fff;
    top:0;
    font-size: 20px;
    display: flex;
    align-items: center;
    padding: 5px 15px;
    font-weight: 700;
    span{
        font-size: 25px;
        margin-right: 15px;
    }
}
.title {
    margin: 8px 15px;
    font-size: 16px;
    font-weight: 700;
}
 .tuijiangedan{
     font-size: 16px;
    font-weight: 700;
     display: flex;
     justify-content: space-between;
     margin: 10px;
     .btn{
         font-size: 13px;
         line-height: 20px;
         color: #666;
         border:1px solid #666;
         padding:2px 10px;
         border-radius: 1rem;
     }

 }
</style>