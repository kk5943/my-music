<template>
<div class="nav">
        
    <div class="nav-input" ><input type="text" :placeholder="'都在搜' +' '+val" v-model="search" @keyup.enter="gotomusic">
         <span @click="$router.go(-1)">取消</span>
    </div>
        <div v-if="isshow">
            <div style="margin:15px 0 10px 15px;font-size:14px">热搜榜</div>
            <div class="box">
                <div class="item" v-for="(item,index) in hotlist" :key="index">
                    <div class="index" :class="{'active':index<=3}" >{{index +1}}</div>
                    <div class="name" @click="gomusic(item.searchWord)">
                        <div>{{item.searchWord}} <span v-if="item.iconType==1">HOT</span> </div>
                        <p>{{item.content}}</p>
                    </div>
                </div>
            </div>
        </div>
            <div v-if="search !=''">
            <p class="sousuo">搜索 '{{search}} '</p>
            <div v-for="(item,index) in jianyi" :key="index" class="jianyi">
                
                 <div @click="gomusic(item.name)"><span class="iconfont icon-huaban"></span>{{item.name}} </div>
            </div>
            </div>
</div>
</template>
<script>
    export default {
        data(){
            return{
                val:'请输入搜索内容',
                search:'',
                hotlist:[],
                searchlist:[], 
                jianyi:[],
                isshow:true
            }
        },
        watch:{
            search(){
                this.isshow=false
                if(this.search!=''){
                     this.$http.get(`/search/suggest?keywords= ${this.search}`).then(res=>{
                    this.jianyi =res.data.result.songs
                    console.log(this.jianyi)
                })
                }else{
                    this.isshow =true
                }
               
            }
        },
        methods:{
            gosearch(){
                
            },
            gethot(){
                this.$http.get('/search/hot/detail').then(res=>{
                    this.hotlist=res.data.data
                    console.log(this.hotlist)
                })
                 this.$http.get('/search/default').then(res=>{
                    this.val=res.data.data.realkeyword
                    console.log(res)
                })
            },
            gomusic(id){
                this.$router.push({path:'/musiclist',query:{keywords:id}})
            },
            gotomusic(){
                 this.$router.push({path:'/musiclist',query:{keywords:this.search}})
            }
        },
        created(){
            this.gosearch()
            this.gethot()
        }
    }
</script>
<style lang="less" scoped>
.active{
    color: red;
}
.nav{
width: 100%;
height: 100%;
overflow: hidden;
box-sizing: border-box;
    .sousuo{
        margin-top: 15px;
        font-size: 14px;
        color:#507daf;
        padding-left: 10px;
        background: rgba(0, 0, 0, 0.005);
    }
     .jianyi{
         padding-left: 10px;
         border-bottom: 1px solid #eee;
         line-height: 50px;
         color: #666;
         div{
             font-size: 14px;
             span{
                 margin-right: 10px;
             }
         }
     }
    .box{
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        .item{
            margin: 8px 0;
            width: 48%;
            display: flex;
            align-items: center;
            .index{
                font-size: 16px;
                margin: 0 10px;
                color:#666;
            }
            .name{
                div{
                    font-size: 14px;
                    span{
                        color:red;
                        font-weight: 700;
                        font-style: italic;
                        font-size: 13px;
                    }
                }
                p{  
                    width: 88%;
                    font-size: 12px;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                    color: #999;
                }
            }
        }
    }
    box-sizing: border-box;
    padding:10px;

    width: 100%;
    
    input{
        margin-left: 10px;
        font-size:14px ;
       width: 76%;
       padding: 3px 0;
       padding-left: 35px;
       line-height: 26px;
       border:1px solid #ddd;
       border-radius: 15px;
       background: url('../../assets/search1.png') no-repeat ;
        background-color: white;
        background-size:24px;
        color: #999;
        background-position: 10px 5px; 
    }
}
</style>