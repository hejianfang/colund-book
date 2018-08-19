<template>
    <div class="content">
      <img src="/static/img/yun.jpg">
      <div class="yundang">云书 2.0</div>
      <button open-type="getUserInfo" @getuserinfo="bindGetUserInfo" v-show="!value">获取授权</button>
      <button @click="login" v-show="value">立即登录</button>
      <!--<button v-show = 'show' open-type="getPhoneNumber">立即绑定手机</button>-->
      <!--<div v-show = 'show'>为了你的账户安全，请先绑定手机</div>-->
      <div class="bottom">小程序有云书提供技术支持</div>
    </div>
</template>

<script>
  import {axios} from '@/utils/index'
  export default {
   data(){
     return{
       value:''
     }
   },
    methods:{
      login(){
        wx.login({
          success: function(res) {
            let code = res.code
             axios.post('/login',{code,appid:'wxfab09830e3ecdc04',secret:'05899fa590f991598cdd6026eb4fcbf1'}).then(res=>{
               let value = wx.getStorageSync('key')
                if(res.code == 200 && value){
                   wx.navigateBack({
                     delta: 1
                 })
                }
             })
          }
        })
      },
      bindGetUserInfo(e){
        console.log(e);
        wx.setStorageSync('key', e.mp.detail.userInfo)
        this.value = e.mp.detail.userInfo
      }
    }
  }
</script>

<style scoped lang="less">
  .content{
  img{
    width: 500rpx;
    height: 290rpx;
    margin: 30% 0 0 16%;
  }
    .yundang{
      text-align: center;
      color:#1984d2;
      margin: 20rpx 0 100rpx;
      font-weight: 500;
      text-shadow:2px 2px 8px #1984d2;
    }
    button{
      margin: 0 auto;
      border-radius:40px;
      background-color:#1984d2 ;
      color:#fff;
      width: 80%;
      box-shadow: 0 0 6px #1984d2 ;
    }
    .bottom{
      position: fixed;
      left: 0;
      right: 0;
      bottom: 10rpx;
      text-align: center;
    }
  }

</style>
