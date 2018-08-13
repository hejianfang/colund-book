<template>
<div>
  <div v-if="!show" id="loading">
    <img src="/static/img/loading1.gif">
  </div>
  <div class="container" v-else="show">
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
          <div class="sss">
            <span>查看目录</span>
            <span>共{{langhth}}章</span>
          </div>
          <div class="gengxin">更新于2天前</div>
        </div>
      </div>
    </div>
    <button id="btn" @click="handleClick(bookMsg._id)">阅读该书籍</button>
  </div>
</div>
</template>

<script>
  import {axios} from '@/utils/index'
  export default {
    data(){
      return{
      bookId:'',
      bookMsg:{},
      langhth:0,
        show:false
      }
    },
    methods:{
      getData(){
        axios.get(`/book/${this.bookId}`).then(res=>{
          this.bookMsg = res.data
          this.langhth = res.length
          this.show = true
        })
      },
      handleClick(val){
        this.$store.commit('increment',val)
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
  #loading{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: white;
    img{
      transform: translate(10%,50%);
    }
  }
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
    margin: 20rpx 0;
    .lists{
      display: flex;
      height: 20px;
      line-height: 35px;
      justify-content: space-between;
      .gengxin{
        font-size: 28rpx;
      }
    }
    .lists .sss span:first-child{
      font-size: 34rpx;
      font-weight: 700;
      margin-right: 10px;
    }
    .lists .sss span:nth-child(2){
      font-size: 28rpx;
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
