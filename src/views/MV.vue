<template>
    <div>
        <van-tabs v-model="area" line-height='1px' sticky title-active-color='#dd6d60' line-width='0' :border='false'>
        <van-tab title="全部" name="全部"></van-tab>
        <van-tab title="内地" name="内地"></van-tab>
        <van-tab title="港台" name="港台"></van-tab>
        <van-tab title="韩国" name="韩国"></van-tab>
        <van-tab title="日本" name="日本"></van-tab>
        <van-tab title="欧美" name="欧美"></van-tab>
        </van-tabs>
         <van-tabs v-model="type" line-height='0px' sticky title-active-color='#dd6d60' line-width='0' :border='false'>
        <van-tab title="全部" name="全部"></van-tab>
        <van-tab title="官方版" name="官方版"></van-tab>
        <van-tab title="原生" name="原生"></van-tab>
        <van-tab title="现场版" name="现场版"></van-tab>
        <van-tab title="网易出品" name="网易出品"></van-tab>
        </van-tabs>
          <van-tabs v-model="order" line-height='0px' sticky title-active-color='#dd6d60' line-width='0' :border='false'>
        <van-tab title="上升最快" name="上升最快"></van-tab>
        <van-tab title="最热" name="最热"></van-tab>
        <van-tab title="最新" name="最新"></van-tab>
        <van-list  v-model="loading"   :finished="finished" finished-text="没有更多了"  @load="onLoad"
            loading-text='正在加载更多' offset='100'>
                  <!-- <div class='list-title' v-if="mvtotal!=0"> 搜索到{{mvtotal}}...下划加载更多</div>
                 <div class='list-title' v-else> 什么都没有搜索到哦，换一个关键词吧</div> -->
                 <div class="gedan-box">
                    <div class="item" v-for="(item,index) in mvList" :key="index" @click="toMv(item.id)">
                        <img :src="item.cover" alt="">
                        <div v-if="item.description">{{item.description}}</div>
                        <div v-else>{{item.name}}</div>
                        <span class="iconfont icon-play3">{{ item.playCount >= 100000 ? parseInt(item.playCount/10000) +'万' : item.playCount }} </span>
                    </div>
                </div>
        </van-list>
        </van-tabs>
        
    </div>
    
</template>

<script>
    export default {
        data(){
            return{
                area:'全部',
                type:'全部',
                order:'最热',
                
                limit: 10,
                page: 1,
                total: 0,
                mvList: [],
                 loading: false,
                finished: false
            }
        },
        created() {
            this.getData();
        },
        watch: {
            area() {
                this.mvList =[]
                this.page = 1;
                this.getData()
                
            },
            
            type() {
                this.mvList =[]
                this.page = 1;
                 this.getData()
                 
            },
          
            
            order() {
                this.mvList =[]
                this.page = 1;
                 this.getData()
                 
            },
           
            
        },
        methods: {
            getData() {
               
             this.$http.get('/mv/all', {params:{limit:this.limit ,area:this.area, order:this.order ,offset: (this.page - 1) * this.limit}} ).then(res=>{
                this.mvList.push(...res.data.data) 
                 console.log(res)
                if (res.data.count) {
                this.total = res.data.count;
             }
               
           })
            
            },
               onLoad() {
                 this.page++
                 this.getData()
                this.loading = false;

               
           
            },
            toMv(id) {
                 this.$router.push({path:'/mvdetail',query:{mvid:id}})
            }
        }
 }
</script>
 

<style lang="less" scoped>



</style>