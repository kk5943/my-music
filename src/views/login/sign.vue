<template>
    <div>
        <div class="left"><van-icon name="arrow-left" color="#666" size="24"   @click="$router.go(-1)"/></div>
        <van-field v-model="tel" type="tel" label="手机号"  placeholder="请输入手机号" />
        <van-field
        v-model="sms"
        center
        clearable
        label="请输入验证码"
        placeholder="请输入短信验证码" 
        >
        <van-button slot="button" v-show="show" size="small" round type="danger" @click="goyzm" >发送验证码</van-button>
        <van-button slot="button" v-show="!show" disabled size="small" round type="danger" @click="goyzm" >{{count}}'秒后重试'</van-button>
        </van-field>
         <van-field v-model="password" type="password" label="密码"  placeholder="请输入密码（9~18位数字字母下划线）" />
         <van-field v-model="text" label="昵称"  placeholder="可使用3~8中文，字母，符号"/>
         <div class="item">
            <button @click="yanzheng" >立即登录</button>
        </div>
     
    </div>
</template>

<script>
import { Toast } from 'vant'
    export default {
        data(){
            return{
                tel:'',
                sms:'',
                password:'',
                text:'',
                 show: true,
                count:'',
                time:null
            }
        },
        methods:{
            goyzm(){
               if(this.tel.length==11){
                   
                    const TIME_COUNT = 60;
                   this.count = TIME_COUNT;
                    this.show = false;
                this.timer = setInterval(() => {
                if (this.count > 0 && this.count <= TIME_COUNT) {
                    this.count--;
                    } else {
                    this.show = true;
                    clearInterval(this.timer);
                    this.timer = null;
                    }
                }, 1000)
                
                    this.$http.get(`/captcha/sent?phone=${this.tel}`).then(res=>{
                    if(res.data.code==200){
                         this.$toast('验证码已发送');
                    }
                })
               }else{
                    this.$toast('请输入正确手机号码');
               }
            },
            yanzheng(){
                if(this.sms.length==4 &&this.password.length>=9 && this.text.length>=3){
                    this.$http.get(`/register/cellphone?phone=${this.tel}&password=${this.password}&captcha=${this.sms}&nickname=${this.text}`).then(res=>{
                        if(res.data.code==200){
                            this.$toast('登录成功')
                            this.$store.state.user =res.data
                            this.$router.push('/faxian')
                            console.log(this.$store.state.user)
                        }
                    })
                   
                }else{
                    this.$toast('请输入完整的信息');
                }
               
            },
            jishiqi(){
                this.num --
            }
        }
    }
</script>

<style lang="less" scoped>
 .item {
        width: 100%;
       margin-top:50px;
        text-align: center;
        margin-top:15px;
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