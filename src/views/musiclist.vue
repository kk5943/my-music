<template>
    <div>
        <van-nav-bar title="发现音乐" left-text="返回" fixed >
            <span class="iconfont icon-huaban" slot="right" @click="$router.push('/search')"></span>
            <span class="iconfont icon-fanhui"  slot="left" @click="$router.go(-1)"></span>
        </van-nav-bar>
        <van-tabs v-model="activeName" line-height='1px' fixed z-index='0' title-active-color='#df6d60 '>
            <van-tab title="歌曲" name="1"> 
                
             <van-list  v-model="loading"   :finished="finished" finished-text="没有更多了"  @load="onLoad"
            loading-text='正在加载更多' offset='100'>
            <!-- <van-cell v-for="item in songlist" :key="item.id" :title="item.name" /> -->
           <div class='list-title'> <span class="iconfont icon-bofang2"></span> 播放全部 <span class="txt">（共{{total}}首）</span></div>
            <div v-for="(item,index) in songlist" :key="index" class="listbox">
                <div class="left">
                    <div class="name">{{item.name}}</div>
                    <div class="geshou"> 
                     <span v-if="item.fee==8" class="sq">SQ </span>
                     {{item.artists[0].name}} <span v-if="item.alias[0]">{{ '-'+item.alias[0]}}</span>
                      
                     </div>
                </div>
                <div class="log">
                    <span v-if="item.mvid != 0" class="iconfont icon-MV"></span> 
                     <span class="iconfont icon-bofang2" @click="tomusicplay(item.id)"></span>
                </div>
            </div>
            
            </van-list>
            </van-tab>
            <van-tab title="歌单" name="1000"> 
             <van-list  v-model="loading"   :finished="finished" finished-text="没有更多了"  @load="onLoad"
            loading-text='正在加载更多' offset='100'>
            
            
                 <div class="gedan-box">
                    <div class="item" v-for="(item,index) in palylist" :key="index" @click="gogedan(item.id ,item.description)">
                        <img :src="item.coverImgUrl" alt="">
                        <div v-if="item.description">{{item.description}}</div>
                        <div v-else>{{item.name}}</div>
                        <span class="iconfont icon-play3">{{ item.playCount >= 100000 ? parseInt(item.playCount/10000) +'万' : item.playCount }} </span>
                    </div>
                </div>
            </van-list>
            </van-tab>
            <van-tab title="MV" name="1004"> 
             <van-list  v-model="loading"   :finished="finished" finished-text="没有更多了"  @load="onLoad"
            loading-text='正在加载更多' offset='100'>
                  
                 <div class="gedan-box">
                    <div class="item" v-for="(item,index) in mvs" :key="index">
                        <img :src="item.cover" alt="">
                        <div v-if="item.description">{{item.description}}</div>
                        <div v-else>{{item.name}}</div>
                        <span class="iconfont icon-play3">{{ item.playCount >= 100000 ? parseInt(item.playCount/10000) +'万' : item.playCount }} </span>
                    </div>
                </div>
             </van-list>
            </van-tab>
                <van-tab title="视频" name="1014"> 
             <van-list  v-model="loading"   :finished="finished" finished-text="没有更多了"  @load="onLoad"
            loading-text='正在加载更多' offset='100'>
                
                 <div class="gedan-box">
                    <div class="item" v-for="(item,index) in videos" :key="index">
                        <img :src="item.coverUrl" alt="">
                        <div v-if="item.title">{{item.title}}</div>
                        <div v-else>{{item.name}}</div>
                        <span class="iconfont icon-play3">{{ item.playCount >= 100000 ? parseInt(item.playCount/10000) +'万' : item.playCount }} </span>
                    </div>
                </div>
             </van-list>
            </van-tab>
            
                <van-tab title="歌手" name="100"> 
             <van-list  v-model="loading"   :finished="finished" finished-text="没有更多了"  @load="onLoad"
            loading-text='正在加载更多' offset='100'>
               
               <div class="artists" v-for="(item,index) in artists" :key="index"> 
                   <div class="item l">
                       <img :src="item.picUrl" alt="">
                        <span class="name">{{item.name}}</span>
                       <span v-if="item.alias[0]" class="waihao">{{item.alias[0]}}</span>
                   </div>
                   
                   <div class="item r" v-if="!item.alias[0]">
                       <span class="iconfont icon-yonghu"></span>
                       <span>已入驻</span>
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
               activeName: '1',
              songlist:[],
                palylist:[],
                mvs:[],
                query:{
                    name:'',
                    limit:15,
                    offset:1,
                    type:1
                },
                total:0,
                palytotal:0,
                mvtotal:0,
                videos:[],
                vdtotal:0,
                artists:[],
                artiststol:0,
                 loading: false,
                finished: false
           }
        },
        watch:{
            activeName(val){
                this.offset=1
                this.query.type = val
                this.getdata()
            }
        },
        methods:{
            getdata(){
                const keywords =this.$route.query.keywords
                const page = (this.query.offset - 1)*this.query.limit
               this.$http.get('https://autumnfish.cn/search',{params:{
                keywords,
                limit:this.query.limit,
                offset:(this.query.offset-1)*this.query.limit,
                type:this.query.type
            }}).then(res=>{
                console.log( res)
               if(res.data.result.songs){this.songlist.push(...res.data.result.songs)}
                if(res.data.result.songCount) {this.total =res.data.result.songCount}
                if(res.data.result.playlistCount){this.palytotal =res.data.result.playlistCount}
               if(res.data.result.playlists){this.palylist.push(...res.data.result.playlists)}
                if(res.data.result.mvs){ this.mvs.push(...res.data.result.mvs)}
                if(res.data.result.mvCount){this.mvtotal=res.data.result.mvCount}
                if(res.data.result.videos){this.videos.push(...res.data.result.videos)}
                if(res.data.result.videoCount){this.vdtotal=res.data.result.videoCount}
                if(res.data.result.artists){this.artists.push(...res.data.result.artists)}
                if(res.data.result.artiststol){this.vdtotal=res.data.result.artiststol}
               
            })
            },
             onLoad() {
                 this.query.offset++
                 this.getdata()
                this.loading = false;
            },
            gogedan(gedanid ,name){
                // console.log(gedanid ,name)
             this.$router.push({path:'/gedanxq',query:{id:gedanid ,iname:name}})
             },
             tomusicplay(id){
        // this.$store.state.urlinfo.url =id
         this.$store.state.id =id
         this.$store.state.boxshow =true
        //  this.$router.push({path:'/play',query:{id:id,}})  
        //  this.$router.push({path:'/play',query:{id:id,}})  
    }
        },
        created(){
           
            this.getdata()
        }
    }
</script>

<style lang="less" scoped>
.artists{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 15px 10px 15px;
    .l{
        display: flex;
        align-items: center;
        img{
            width: 58px;
            height: 58px;
            border-radius: 50%;
        }
        .name{
            font-size: 14px;
        }
        span{
            margin-left: 15px;
        }
        .waihao{
            font-size: 13px;
            color: #666;
        }
    }
    .r{
         span{
            font-size: 13px;
            color: #666;
        }
        .iconfont{
            background: red;
            color: #fff;
            border-radius: 50%;
            padding:1px;
            font-size: 14px;
            margin-right: 5px;
        }
       
    }
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
.van-tabs {
    margin-top:46px
}
</style>