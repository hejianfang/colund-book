<template>
 <div>
     <img src="/static/img/Disk-1s-200px.svg" v-show="!show" id="loading">
   <div class="container" v-if="show">
     <div class="item-swiper">
       <swiper :indicator-dots="true"
               :circular="true"
               :autoplay="autoplay"
               :interval="interval"
               :duration="duration"
               indicator-active-color="#fff">
         <block v-for="(item,index) in swiperArr" :key="index">
           <swiper-item class="swiper-wrap">
             <a :href="'/pages/details/main?id='+ item.book._id">
               <img :src="item.img">
             </a>
             <div class="item-title">{{item.title}}</div>
           </swiper-item>
         </block>
       </swiper>
     </div>
     <div class="item-content" v-for="(item,value) in lists" :key="value">
       <div class="content-top">
         <div class="content-wraps"><span>|</span><span>{{item.title}}</span></div>
         <div class="content-more" @click="handleMore(item)"><span>更多...</i></span></div>
       </div>
       <div class="items-wrap" v-for="(ite,index) in item.books" :key="index" @click="handleClickid(ite._id)">
         <img :src="ite.img">
         <div class="items-details">
           <div class="items-detail">
             <p>{{ite.title}}</p>
             <p>{{ite.desc}}</p>
           </div>
           <p><span>{{ite.author}}</span> <span>两天前 <span>{{item.title}}{{ite.looknums}}人在看</span></span> </p>
         </div>
       </div>
     </div>
   </div>
 </div>
</template>

<script>
  import {axios} from '@/utils/index'
  export default {
    data () {
      return {
        autoplay: true,
        interval: 5000,
        duration: 500,
        swiperArr: [],
        lists:[],
        show :false
      }
    },
    methods: {
      getSwiper () {
        axios.get('/swiper').then(res => {
          this.swiperArr = res.data
          this.show = true
        })
      },
      getLists(){
        axios.get('/category/books').then(res=>{
          this.lists = res.data
          this.show = true
        })
      },
      handleClickid(val){
        wx.navigateTo({
          url: `/pages/details/main?id=${val}`
        })
      },
      handleMore(val){
        wx.navigateTo({
          url: `/pages/more/main?id=${val._id}`
        })
      }
    },
    created () {
       this.getSwiper()
       this.getLists()
    },
  onPullDownRefresh(){
      wx.setBackgroundTextStyle({
        textStyle: 'dark', // 下拉背景字体、loading 图的样式为dark
      })
      let that = this
    if(that.lists){
      that.getSwiper()
      that.getLists()
      wx.stopPullDownRefresh()
    }else{
      wx.showToast({
        title: '失败',
        icon:'cancel',
        duration: 2000
      })
    }
    },
    onReachBottom(){

    }
  }
</script>

<style scoped lang="less">
  .item-swiper{
    height: 400rpx;
    swiper{
      height: 400rpx;
      .swiper-wrap{
        position: relative;
        img {
          width:100%;
          height:400rpx;
          display: block;
          box-shadow:0 0 4px 2px rgba(0,0,0,.6) ;
        }
        .item-title{
          position: absolute;
          bottom: 0;
          left: 0;
          color: #fff;
          width: 100%;
          padding: 2rpx 10rpx;
          background-color: rgba(0,0,0,.4);
        }
      }
    }
    }
  .item-content{
    .content-top{
      margin: 20rpx 0;
      display: flex;
      justify-content: space-between;
    }
    .content-more{
      font-size: 30rpx;
      color: #666;
      vertical-align: middle;
    }
    .content-top .content-wraps span:last-child{
      font-size: 36rpx;
      font-weight: 600;
      margin-left: 10rpx;
    }
    .items-wrap{
      display: flex;
      margin-top: 30rpx;
        img{
          flex:1.2;
          height:260rpx;
          box-shadow:0 0 4px 3px rgba(0,0,0,.6) ;
        }
      .items-details{
        height:260rpx;
        flex:3;
        padding:0 16rpx;
        display: flex;
        justify-content: space-between;
        flex-direction:column;
      }
      .items-detail p:nth-child(1){
        font-size: 30rpx;
        color: #000;
      }
      .items-detail p:nth-child(2){
          margin-top: 20rpx;
          font-size: 26rpx;
          color: #555;
         overflow : hidden;
         text-overflow: ellipsis;
         display: -webkit-box;
         -webkit-line-clamp: 3;
         -webkit-box-orient: vertical;
        }
      .items-details p{
        font-size: 26rpx;
        color: #555;
        display: flex;
        justify-content: space-between;
      }
    }
  }
</style>
