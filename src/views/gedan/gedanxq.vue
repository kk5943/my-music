<template>
    <div class="gedanwrp">   
         <van-notice-bar color="#666"  background="#fff"  left-icon="info-o">
        <template slot="left-icon"> <van-icon size="24px"  name="arrow-left" @click="$router.go(-1)"/> </template>
        <template slot="default"> <div class="tongzhi">{{$route.query.name}}</div></template>
        <!-- {{$route.query.iname}} -->
        </van-notice-bar>
  
    <div class="top" > 
        <div>
            <div class="top">
                <div class="item left">
                    <img :src="playlist.coverImgUrl" alt="">
                </div>
                <div class="right item">
                    <div class="name">{{playlist.name}}</div>
                    <div class="info"> <img v-if="creator.avatarUrl" :src="creator.avatarUrl" alt="">
                    <span class="name">{{creator.nickname}}</span>
                    <span class="time">{{playlist.createTime |time}}</span>
                    </div>
                    <div class="jieshao"> {{creator.signature}}</div>
                </div>
            </div>
            <div class="pinlun"></div>
             <img :src="playlist.coverImgUrl" alt="" class="bg">
        </div> 
        
    </div>
     <van-tabs v-model="type" line-height='1px' line-width='80px' title-active-color='#dd6d60'  :border='false' sticky>
        <van-tab title="歌曲" name="歌曲">
     <van-list  v-model="loading"   :finished="finished" finished-text="没有更多了"  @load="onLoad"
     loading-text='正在加载更多' offset='50'>
       
      <div class='list-title'> <span class="iconfont icon-bofang2"></span> 播放全部 <span class="txt">（共{{songs.length}}首）</span></div>
      <div v-for="(item,index) in songs" :key="index" class="listbox">
                <div class="left">
                    <div class="name">{{item.name}}</div>
                    <div class="geshou"> 
                     <span v-if="item.fee==8" class="sq">SQ </span>
                     {{item.ar[0].name}} 
                     <span v-if="item.al.name">
                         {{ '-'+item.al.name}}</span>
                      
                     </div>
      </div>
     <div class="log">
         <span v-if="item.mv!= 0" class="iconfont icon-MV"></span> 
         <span class="iconfont icon-bofang2" @click="tomusicplay(item.id ,index)"></span>
   
       </div>
         </div>
            
   </van-list>
        </van-tab>
        <van-tab :title="title"  >
             <van-list  v-model="loading1"   :finished="finished1" finished-text="没有更多了"  @load="onLoad1"
                 loading-text='正在加载更多' offset='100'>
             <div class="plwp"> 
                     <p class="new"> 最新评论（{{pltotal}}）条</p>
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

        </van-tab>
        
        </van-tabs>
     
           
            
 </div>
</template>

<script>
    export default {
      data(){
          return{
               loading: false,
                finished: false,
                loading1: false,
                finished1: false,
                playlist:{},
                creator:{},
                // activeName: 'first',
                songs:[],
                pinlunlist:[],
                pltotal:0,
                limit:15,
                offset:1,
                offset1:1,
                type:'歌曲',
                title:''
               

                
          }
      } ,
      methods:{
          getData(){
              this.$http.get(`/playlist/detail?id=${this.$route.query.id}`).then(res=>{
                    
                    this.playlist=res.data.playlist
                   if(res.data.playlist.creator){this.creator =res.data.playlist.creator}
                    this.songs.push(...this.playlist.tracks)
                    // console.log(this.songs) 
                })
          },
          getpinlun(){
                 this.$http.get('/comment/playlist',{params:{
                id:this.$route.query.id,
                limit:this.limit,
                offset:(this.offset1-1)*this.limit,
            }}).then(res=>{
                   
                    this.pinlunlist.push(...res.data.comments)
                    this.pltotal =res.data.total
                    this.title ='评论（'+ res.data.total+' )'
                    // console.log(res)
                    //  console.log(this.pinlunlist)
                })
            },
             onLoad() {
                 this.offset++
                 this.getData()
                this.loading = false;
            },
             onLoad1() {
                 this.offset1++
                 this.getpinlun()
                this.loading1 = false;
            },
             tomusicplay(id ,index){
            // this.$store.state.urlinfo.url =id
             this.$store.state.songlist=this.songs
             this.$store.state.index=index
             this.$store.state.id =id
             this.$store.state.boxshow =true
             console.log(this.$store.state.songlist ,index)
        //  this.$router.push({path:'/play',query:{id:id,}})  
            // this.$router.push({path:'/play',query:{id:id,}})  
             }
      },
      created(){
          this.getData()
           this.getpinlun()
        //   console.log(this.$route)
      }
    }
</script>

<style lang="less" scoped>
.top{
    display: flex;
    justify-content: center;
    align-items: center;
     position: relative;
     z-index: 9;
   overflow: hidden;
   padding: 16px 0;
   .left{
        img{
        width: 165px;
        height: 165px;
        border-radius: 10px;
    }
   }
    .right{
        .name{
            color: #fff;
            font-size: 16px;
        }
        .info{
            display: flex;
            align-items: center;
            margin: 10px 0;
            img{
                width: 40px;
                height: 40px;
                border-radius: 50%;
                margin-right: 5px;
            }
            .name{
                font-size: 13px;
                color: #eee;
            }
            .time{
                font-size: 12px;
                margin-left: 5px;
                color: #ded;
            }
        }
        .jieshao{
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            font-size: 12px;
            color: #eee;
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
    -webkit-filter: blur(7px);
    filter: blur(7px);
    -webkit-transform: scale(1.5);
    -ms-transform: scale(1.5);
    transform: scale(1.5);
    background-color: rgba(0,0,0,.25)
    
}
.gedanwrp{
    padding-top:40px
}
.van-notice-bar{
    position: fixed;
    top:0;
    left:0 ;
    width: 100%;
   z-index: 99;
    font-size: 16px;
    color: #555;
    
}
.gedanwrp.van-icon-arrow-left{
    font-size: 20px;
}
.tongzhi{
    z-index: 99;
    text-align: center;
    margin: 0 50px;
    color:#111;
   
}
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
</style>