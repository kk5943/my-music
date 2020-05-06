<template>
    <div>
        
        <div class="wrp">
            <span class="iconfont icon-fanhui" @click="$router.go(-1)"></span>
            <div class="play">
                <div class="videowp">
                    <video :src="mvurlobj.url" controls ></video>
                </div>
                <div class="log"> 
                        <div>
                             <img :src="mvlist.cover" alt="" >
                             <span class="name"> {{mvlist.artistName}}</span>
                        </div>
                     <h4>{{mvlist.name}}</h4>
                </div>
               
                <div class="time"> 发布：{{mvlist.publishTime+' '}}  播放：{{mvlist.playCount}}次</div>
                <div style="margin:25px 0 25px 0">{{mvlist.desc}}</div>

                 <div class="gedan-box">
                    <div class="item tuijian" v-for="(item,index) in mvs" :key="index" @click="gomv(item.id)">
                        <img :src="item.cover" alt="">
                        <div v-if="item.description">{{item.description}}</div>
                        <div v-else>{{item.name}}</div>
                        <span class="iconfont icon-play3">{{ item.playCount >= 100000 ? parseInt(item.playCount/10000) +'万' : item.playCount }} </span>
                    </div>
                </div>
              <van-list  v-model="loading"   :finished="finished" finished-text="没有更多了"  @load="onLoad"
                 loading-text='正在加载更多' offset='100'>
             <div class="plwp"> 
                     <p class="new"> 最新评论（{{total}}）条</p>
                        <div v-for="(item ,index) in pinlunlist" :key='index' class="item">
                            <div class="box">
                                 <img :src="item.user.avatarUrl" alt=""  >
                            <div>
                             <span class="name" >{{item.user.nickname}}:</span>
                            <p style="color: #bebebe;font-size: 10px;">{{item.time | time}}</p>
                           </div>
                            </div>
                            <div class="text" > {{item.content}}</div> 
                            </div>
                       
                 </div>
          </van-list>

            </div>
            
            </div>
    </div>
</template>

<script>
    export default {
         data(){
            return{
                mvurlobj:{},
                mvs:[],
                mvid:'',
                mvlist:{},
                limit:20,
                offset:1,
                total:0,
                pinlunlist:[],
                loading: false,
                finished: false
            }
        },methods:{
             getpinlun(){
                 this.$http.get('/comment/mv',{params:{
                id:this.$route.query.mvid,
                limit:this.limit,
                offset:(this.offset-1)*this.limit,
                
            }}).then(res=>{
                   
                    this.pinlunlist.push(...res.data.comments)
                    this.total =res.data.total
                    // console.log(res)
                    
                })
            },
            onLoad() {
                 this.offset++
                 this.getpinlun()
                this.loading = false;
            },
           
            gomv(id){
                 this.$router.push({path:'/mvdetail',query:{mvid:id}})
                   this.tomv()
             this.getpinlun()
            },
            tomv(){
             this.$http.get(`/mv/url?id=${this.$route.query.mvid}`).then(res=>{
                this.mvurlobj=res.data.data
                this.mvid=res.data.data.id
                //    console.log(res)
            })
            this.$http.get(`/simi/mv?mvid=${this.$route.query.mvid}`).then(res=>{
             
                this.mvs=res.data.mvs
                //    console.log(res)
            })  
             this.$http.get(`/mv/detail?mvid=${this.$route.query.mvid}`).then(res=>{
             
                this.mvlist=res.data.data
                //    console.log(res)
            }) 
            }

        },
        created(){
             this.tomv()
             this.getpinlun()
        }
    }
</script>

<style lang="less" scoped>
.icon-fanhui{
    display: inline-block;
    position: fixed;
    left: 5px;
    top:3px;
    font-size: 18px;
    color: #fff;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 50%;
    padding: 3px;
    z-index: 99;
}
.wrp{
    .plwp{
        margin: 10px 15px;
        .item{
            border-bottom: 1px solid #eee;
            margin: 15px 0;
        }
    
        .text{
                margin-left: 30px;
                color: #333;
                 font-size: 15px;
            }
        .box{
            display: flex;
            align-items: center;
            
            img{
                width: 28px;
                height: 28px;
                border-radius: 50%;
                margin-right: 8px;
            }
        }
        div{
            .name{
                font-size: 12px;
                color: #555;
            }
        }
    }
    video{
        width: 100%;
        height: 100%;
    }
    .time{
        color: #bebebe;font-size: 14px;
        padding-left: 10px;
    }
    .log{
        padding:10px 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        h4{
            padding-right: 15px;
        }
       div{
            display: flex;
        align-items: center;
            img{
            margin-right: 6px;
            width: 50px;
            height: 46px;
            border-radius: 50%;
        }
       
       }
        
    }
}
.gedan-box{
    padding-bottom: 0;
}
</style>