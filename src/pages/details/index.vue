<template>
<div>
    <img src="/static/img/Disk-1s-200px.svg" v-show="!show" id="loading">
  <div class="container" v-if="show">
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
      <button type="default" size="mini" @click="getCollection" v-if="isCollect == 0">加入收藏</button>
      <button type="default" size="mini" v-else="isCollect == 1">已收藏</button>
      <button type="default" size="mini" open-type="share">分享好友</button>
      <!--<button type="default" size="mini">分享朋友圈</button>-->
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
          <div class="gengxin">更新于两天前</div>
        </div>
      </div>
    </div>
    <button id="btn" @click="handleClick(bookMsg._id)">阅读该书籍</button>
  </div>
</div>
</template>

<script>
  import {axios} from '@/utils/index'
  import timer from '@/components/timer'
  export default {
    components:{
      timer
    },
    data(){
      return{
      bookId:'',
      bookMsg:{},
      langhth:0,
      show:false,
      isCollect:''
      // date:''
      }
    },
    methods:{
      computed:{
      },
      getData(){
        this.bookMsg = ''
        this.langhth = 0
        axios.get(`/book/${this.bookId}`).then(res=>{
          this.bookMsg = res.data
          this.langhth = res.length
          this.isCollect = res.isCollect
          this.show = true
        })
      },
      handleClick(val){
        this.$store.commit('increment',val)
        wx.navigateTo({
          url: `/pages/catalogue/main?id=${val}`
        })
      },
      getCollection(){
        axios.post('/collection',{bookId:this.bookId}).then(res=>{
          this.isCollect = 1
        })
      }
    },
    onLoad(options){
      this.show = false
      this.bookId = options.id;
      this.getData();
    },
    onShow(){
       // this.date = wx.getStorageSync('date')

    },
    onShareAppMessage (options) {
      console.log(options)
      return {
        title: this.bookMsg.title,
        path: `/pages/details/main?id=${this.bookId}`,
        imageUrl: this.bookMsg.img
      }
    },
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
    margin: 50rpx 0;
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
