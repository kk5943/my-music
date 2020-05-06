<template>
    <div>
        <div class="my-nav" @click="$router.go(-1)"> 
            <span class="iconfont icon-fanhui"></span>
            排行榜
        </div>
         <p class="title"> 官方榜</p>
        <div class="topbox">
          <div class="item" v-for="(item,index) in guanfang " :key="index" @click="gogedan(item.id,item.description)">
              <img :src="item.coverImgUrl" alt="">
             <div> 
                    <div v-for="(item1,index1) in item.tracks" :key="index1" >
                    <span class="index">{{index1+1}} {{item1.first}}{{'-'+item1.second}}</span>
                    </div>
             </div>
          </div>
        </div>
         <p class="title"> 推荐榜</p>
        <div class="gedan-box">
                    <div class="item itemgedan" v-for="(item,index) in tuijian" :key="index" @click="gogedan(item.id,item.description)">
                        <img :src="item.coverImgUrl" alt="">
                        <div v-if="item.description" class="tophot">{{item.description}}</div>
                        <div v-else>{{item.name}}</div>
                        <span class="iconfont icon-play3">{{ item.playCount >= 100000 ? parseInt(item.playCount/10000) +'万' : item.playCount }} </span>
                    </div>
        </div>
         <p class="title"> 更多榜单</p>
         <div class="gedan-box">
                    <div class="item itemgedan" v-for="(item,index) in gengduo" :key="index" @click="gogedan(item.id,item.description)">
                        <img :src="item.coverImgUrl" alt="">
                        <div v-if="item.description" class="tophot">{{item.description}}</div>
                        <div v-else>{{item.name}}</div>
                        <span class="iconfont icon-play3">{{ item.playCount >= 100000 ? parseInt(item.playCount/10000) +'万' : item.playCount }} </span>
                    </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                guanfang:[],
                tuijian:[],
                gengduo:[],
            }
        },
        methods:{
             gogedan(gedanid ,name){
                // console.log(gedanid ,name)
             this.$router.push({path:'/gedanxq',query:{id:gedanid ,iname:name}})
    }
        },
        created(){
           
            this.$http.get(`/toplist/detail`).then(res=>{
                 this.guanfang=res.data.list.slice(0,4)
                 this.tuijian=res.data.list.slice(4,10)
                 this.gengduo=res.data.list.slice(10,28)
                 console.log(this.gengduo ,res)
            })
        }
    }
</script>

<style lang='less' scoped>
.title{
    padding: 10px 15px;
}
.topbox{
    width: 100%;
    .item{
        display: flex;
         flex-wrap: wrap;
        align-items: center;
        width: 100%;
        img{
            width: 25%;
            height: auto;
            border-radius: 20%;
            padding:10px;
            box-sizing: border-box;
        }
        div{
            width: 75%;
            white-space: nowrap;
             overflow: hidden;
            text-overflow: ellipsis;
            div{
                span{
              font-size: 12px;
              color: #444;
                
             }
            
            }
          
            // display: flex;

        }
    }
}
</style>