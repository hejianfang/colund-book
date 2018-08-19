<template>
    <div >
      <img src="/static/img/Disk-1s-200px.svg" v-show="!show" id="loading">
     <div class="containe" v-if="show">
       <div class="my-top" @click="handleLogin" v-if="shows">
         <img src="/static/img/yun.jpg">
         <div class="my-right">
           <div>未登录</div>
           <div>立即登录，开启您的云档之旅</div>
         </div>
       </div>
       <div class="my-top" @click="handleSet" v-else="shows">
         <img :src="value.avatarUrl">
         <div class="my-right">
           <div>{{value.nickName}}</div>
           <div>这家伙很懒，什么也没没留下</div>
         </div>
       </div>
       <div class="shoucang" v-show="shows">
         <div @click="handleCollection"><div>{{length}}</div><div>收藏</div></div>
         <div><div>4</div><div>关注</div></div>
       </div>
       <div class="my-content">
         <img src="/static/img/yun.jpg">
         <div class="yundang">云书 2.0</div>
       </div>
     </div>
    </div>
</template>

<script>
  import {axios} from '@/utils/index'
  export default {
    data(){
      return{
       shows:true,
        show:false,
        value:{},
        length:0
      }
    },
    methods:{
      handleLogin(){
      if(this.length !== 0){
        wx.navigateTo({
          url: '/pages/login/main'
        })
      }else{
        wx.showToast({
          title: '你没有收藏书籍',
        })
      }
      },
      getCollection(){
        axios.get('/collection').then(res=>{
          if(res.data){
           this.length = res.data.length
         }
         else{
           this.length = 0
         }
        })
      },
      handleCollection(){
        wx.navigateTo({
          url: '/pages/collection/main'
        })
      }
    },
    onReady(){
      this.show = true
    },
    onLoad(){
      // this.getCollection();
    },
    onShow(){
      let value = wx.getStorageSync('key')
      if (value) {
        this.value = value
        this.shows = false
      }
      this.getCollection();
    }
  };
</script>

<style scoped lang="less">
.my-top{
  display: flex;
  height: 190rpx;
  line-height: 70rpx;
  background-color: #1984d2;
  color: #fff;
  padding: 30rpx;
  box-sizing: border-box;
  box-shadow: 0 4px 5px -3px #1984d2;
  img{
    width: 120rpx;
    height: 120rpx;
    border-radius: 50%;
    margin: 10rpx 20rpx 0 0;
  }
  .my-right div:first-child{
    font-size: 38rpx;
    font-weight: 600;
  }
  .my-right div:last-child{
    font-size: 28rpx;
  }
}
  .my-content{
   img{
     width:100%;
     height: 360rpx;
     margin-top: 20%;

   }
    .yundang{
      text-align: center;
      color:#1984d2;
      margin: 20rpx 0 100rpx;
      font-weight: 600;
      font-size: 40rpx;
      text-shadow:2px 2px 8px #1984d2;
    }
  }
  .shoucang{
    display: flex;
    justify-content: space-around;
    text-align: center;
    height: 120rpx;
    color:#fff;
    background-color: #1984d2;
    box-shadow: 0 4px 5px -3px #1984d2;
    font-size: 30rpx;
  }
</style>
