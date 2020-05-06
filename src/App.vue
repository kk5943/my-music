<template>
  <div id="app">
   
   <router-view></router-view>
  </div>
</template>
<script>
export default {
  created(){
      const usinfo= window.sessionStorage.getItem('userinfo')
      this.$store.state.user.profile.nickname =  window.sessionStorage.getItem('username')
      this.$store.state.user.profile.avatarUrl=  window.sessionStorage.getItem('userlog')
      this.$store.state.user.userId=window.sessionStorage.getItem('userid')
      this.$store.state.user.type=window.sessionStorage.getItem('type')
      
    console.log(this.$store.state.user)
  }
}
</script>
<style>
#app{
  height: 100%;
  width: 100%;
  font-size: 14px;
}
</style>
