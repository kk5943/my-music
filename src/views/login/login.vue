<template>
    <div class="box">
        <div class="left"><van-icon name="arrow-left" color="#666" size="24"   @click="$router.go(-1)"/></div>
        <van-field v-model="tel" type="tel" label="手机号" />
        <van-field v-model="password" type="password" label="密码" />
        <!-- <van-field
        v-model="sms"
        center
        clearable
        label="短信验证码"
        placeholder="请输入短信验证码"
        >
        <van-button slot="button" size="small" round type="danger">发送验证码</van-button>
        </van-field> -->
         <div class="item">
            <button @click="login" >立即登录</button>
        </div>
     
    </div>
</template>

<script>
import { Toast } from 'vant'
    export default {
        data(){
            return{
                tel:'',
                password:''
            }
        },
        methods:{
            login(){
                this.$http.get(`/login/cellphone?phone=${this.tel}&password=${this.password}`).then(res=>{
                    // console.log(res)
                 if(res.data.code !=200){
                     this.$toast('密码错误');
                     return
                 }
                 let type =1
                this.$store.state.user =res.data
                this.$store.state.user.type=type
                
                 console.log(res.data)
                 window.sessionStorage.setItem('token',res.data.token)
                 window.sessionStorage.setItem('username',res.data.profile.nickname)
                 window.sessionStorage.setItem('userlog',res.data.profile.avatarUrl)
                 window.sessionStorage.setItem('userid',res.data.profile.userId)
                 window.sessionStorage.setItem('type',type)
                 this.$toast('登录成功');
                 this.$router.push('/faxian')
                 
                })
            }
        }
    }
</script>

<style lang="less" scoped>
.box{
      box-sizing: border-box;
}
 .item {
        width: 100%;
       margin-top:50px;
        text-align: center;
        margin-top:15px;
        box-sizing: border-box;
        button{
          width: 70%; 
          font-size: 18px; 
          color: #fff;
          background: red;
          border:none;
          border-radius: 15px;
          line-height: 40px;
          height: 40px;
        }
 }
</style>