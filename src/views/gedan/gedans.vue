<template>
    <div>
         <van-tabs v-model="cat" line-height='1px'  title-active-color='#dd6d60'  :border='false' sticky>
        <van-tab title="全部" name="全部"></van-tab>
        <van-tab title="欧美" name="欧美"></van-tab>
        <van-tab title="华语" name="华语"></van-tab>
        <van-tab title="流行" name="流行"></van-tab>
        <van-tab title="说唱" name="说唱"></van-tab>
        <van-tab title="摇滚" name="摇滚"></van-tab>
         <van-tab title="民谣" name="民谣"></van-tab>
        <van-tab title="电子" name="电子"></van-tab>
         <van-tab title="轻音乐" name="轻音乐"></van-tab>
        <van-tab title="影视原声" name="影视原声"></van-tab>
        <van-tab title="ACG" name="ACG"></van-tab>
         <van-tab title="怀旧" name="怀旧"></van-tab>
        <van-tab title="治愈" name="治愈"></van-tab>
        <van-tab title="旅行" name="旅行"></van-tab>

         <van-list  v-model="loading"   :finished="finished" finished-text="没有更多了"  @load="onLoad"
            loading-text='正在加载更多' offset='100'>
                 
                 <div class="gedan-box">
                    <div class="item itemgedan" v-for="(item,index) in gedanlist" :key="index" @click="gogedan(item.id,item.description)">
                        <img :src="item.coverImgUrl" alt="">
                        <div v-if="item.description">{{item.description}}</div>
                        <div v-else>{{item.name}}</div>
                        <span class="iconfont icon-play3">{{ item.playCount >= 100000 ? parseInt(item.playCount/10000) +'万' : item.playCount }} </span>
                    </div>
                </div>
        </van-list>
        </van-tabs>
       
       
    <span class="iconfont icon-fanhui fanhui" @click="$router.go(-1)"></span>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                cat: '全部',
                limit: 12,
                page: 1,
                total: 0,
                gedanlist: [],
                 loading: false,
                finished: false
            }
        },
         watch: {
            cat() {
                this.gedanlist =[]
                this.page = 1;
                this.getData()
                
            },
         },
         created() {
            this.getData();
         },
        methods:{
             getData(){
                 this.$http.get('https://autumnfish.cn/top/playlist',
                 {params:{limit:this.limit , cat:this.cat ,offset: (this.page - 1) * this.limit}}).then(
                    res=>{
                        this.gedanlist.push(...res.data.playlists)
                        this.total =res.data.total
                        // console.log(this.gedanlist)
                    }
                )
            },
              onLoad() {
                 this.page++
                 this.getData()
                this.loading = false;
            },
             gogedan(gedanid ,name){
                // console.log(gedanid ,name)
             this.$router.push({path:'/gedanxq',query:{id:gedanid ,iname:name}})
    }
        },
        
    }
</script>

<style lang="less" scoped>
.icon-fanhui{
    font-size: 18px;
}
</style>