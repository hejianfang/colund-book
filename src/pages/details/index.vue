<template>
<div class="container">
  <div class="item-wrap">
    <img :src="bookMsg.img">
    <div class="content-right">
      <div class="content-title">{{bookMsg.title}}</div>
      <div>作者：{{bookMsg.author}}</div>
      <div>{{bookMsg.looknums}}人在看</div>
      <div>{{bookMsg.startsnums}}人喜欢</div>
    </div>
  </div>
  <div class="btn">
    <button type="default" size="mini">加入收藏</button>
    <button type="default" size="mini" open-type="share">分享好友</button>
    <button type="default" size="mini">分享朋友圈</button>
  </div>
 <div class="introduction">
   <div class="introductions">简介</div>
   <div class="desc">
     {{bookMsg.desc}}
   </div>
   <div class="list" @click="handleClick(bookMsg._id)">
     <div class="lists" >
       <span>查看目录</span>
       <span>共{{langhth}}章</span>
       <span>更新于2天前</span>
     </div>
   </div>
 </div>
  <button id="btn" @click="handleClick(bookMsg._id)">阅读该书籍</button>
</div>
</template>

<script>
  import {axios} from '@/utils/index'
  export default {
    data(){
      return{
      bookId:'',
      bookMsg:{},
      langhth:0
      }
    },
    methods:{
      getData(){
        axios.get(`/book/${this.bookId}`).then(res=>{
          this.bookMsg = res.data
          this.langhth = res.length
        })
      },
      handleClick(val){
        wx.navigateTo({
          url: `/pages/catalogue/main?id=${val}`
        })
      }
    },
    onLoad(options){
      this.bookId = options.id;
      this.getData();
    },
    onShareAppMessage(){
      return{
        title: this.bookMsg.title,
        imageUrl: this.bookMsg.img,
        path:'/pages/index/main'
      }
    }
  };
</script>

<style scoped lang="less">
.item-wrap{
  display: flex;
  img{
    flex:1.2;
    height:260rpx;
    box-shadow:0 0 4px 3px rgba(0,0,0,.5) ;
  }
  .content-right{
    height:260rpx;
    flex:3;
    margin-left: 16rpx;
    display: flex;
    justify-content: space-between;
    flex-direction:column;
    .content-title{
      font-size: 30rpx;
      font-weight: 600;
      color: #000;
    }
    .content-title~div{
      font-size: 26rpx;
      color: #888;
      margin-left: 20rpx;
    }
  }
}
  .btn {
    margin: 30rpx 0;
    display: inline-block;
    display: flex;
    justify-content: space-around;
    border: none;
    outline: none;
  }
  .introduction{
    width: 100%;
    border-top: 8px solid #ccc;
    border-bottom: 8px solid #ccc;
    padding: 14px 0;
    .desc{
      font-size: 28rpx;
    }
    .introductions{
      font-weight: 700;
      font-size: 34rpx;
      margin-bottom: 40rpx;
    }
  }
  .list{
    display: flex;
    margin: 20rpx 0;
    .lists{
      display: flex;
      height: 20px;
      line-height: 35px;
      justify-content: space-between;
    }
    .lists span:first-child{
      font-size: 34rpx;
      font-weight: 700;
      margin-right: 10px;
    }
    .lists span:nth-child(2){
      font-size: 28rpx;
      display: inline-block;

    }
    .lists span:last-child{
      font-size: 28rpx;
      margin-left:320rpx;
      display:inline-block;
      vertical-align: middle;
    }
  }
  #btn{
    background-color: skyblue;
    color:#fff;
    width: 95%;
    position: absolute;
    bottom: 10rpx;
  }
</style>
