<template>
    <div class="login-box">
        <div class="left"><van-icon name="arrow-left" color="#fff" size="24"   @click="$router.go(-1)"/></div>
        <div class="item">
            <button  @click="$router.push('/login')">手机号密码登录</button>

        </div>
         <div class="item item1">
            <button  @click="$router.push('/sign')">手机号注册</button>
        </div>
        <div class="item item2">
        <van-checkbox v-model="checked" checked-color="#666" icon-size='16px'>
        同意《服务条款》 《隐私政策》 《儿童隐私政策》
        </van-checkbox>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                 checked: true,
            }
        } 
    }
</script>

<style lang="less" >
.login-box{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background-color: #C21a0C;
    .item {
        width: 100%;
        position: absolute;
        top:70%;
        text-align: center;
        margin-top:15px;
        button{
          width: 70%; 
          font-size: 18px; 
          color: #C20C0C;
          background: #fff;
          border:none;
          border-radius: 15px;
          line-height: 40px;
          height: 40px;
        }

    }
    .item1{
        top:78%
    }
    .item2{
        top:86%;
         font-size: 12px;
        margin-left: 30px;
        .van-checkbox__label{
            color: #fff!important;
            
            
        }
    }
}
.left{
    padding:10px
}
</style>