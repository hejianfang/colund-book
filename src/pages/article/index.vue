<template>
  <div>
    <img src="/static/img/Disk-1s-200px.svg" v-show="!show" id="loading">
    <div class="container" v-if="show">
      <div :style="{fontSize:fontSize + 'px'}">
        <wemark :md="content" link highlight type="rich-text"></wemark>
      </div>
      <div class="catalogue" v-show="shows" @click="handleShows"></div>
        <scroll-view :scroll-y="true"
                     :scroll-with-animation="true"
                     class="wrap" :style="{transform:'translate3d(' + num + ',0,0)',width:width + 'rpx'}">
          <div v-for="(item,index) in catalogues"
               @click="handleclick(item._id)"
               :style="item._id == titleId?'background:#ccc':''"
               :key="index"
               class="title-item">
            {{item.title}}
          </div>
        </scroll-view>
      <div class="bottom">
        <span class="iconfont icon-back click" @click="handlejian"></span>
        <span class="iconfont icon-mulu click" @click="handleShows"></span>
        <span class="iconfont icon-yueduye_zitizengda click" @click="handleBig"></span>
        <span class="iconfont icon-yueduye_zitijianxiao click" @click="handleSmall"></span>
        <span class="iconfont icon-youjiantou click" @click="handlePrev"></span>
      </div>
    </div>
  </div>
</template>

<script>
  import {axios} from '@/utils/index'
  export default {
   data(){
     return{
       titleId:'',
       content:'',
       shows:false,
       show:false,
       catalogues:[],
       fontSize:16,
       index:0,
       title:'',
       num:'-600rpx',
       width:'0'
     }
   },
    methods:{
     async getData(){
       this.content = ''
       const contents = await axios.get(`/article/${this.titleId}`)
         wx.hideLoading()
         this.content = contents.data.article.content
         this.title = contents.data.title
         this.show = true
     },
      handleclick(val){
        this.handleShows()
        this.titleId = val;
        this.getData();
        wx.showLoading({
          title: '加载中',
        })
      },
      handleShows(){
        this.shows = !this.shows
        if(this.shows){
           this.num = 0
          this.width = 600
        }else{
          this.num = '-600rpx'
        }
      },
      async handleShow(){
       this.catalogues = []
       let bookId = this.$store.state.bookId
       const books =await axios.get(`/titles/${bookId}`)
          this.catalogues = books.data
          this.show= true
          books.data.findIndex(item=>{
            if(item._id == this.titleId){
              this.index = item.index
            }
          })
      },
      handleBig(){
        if(this.fontSize < 40){
          this.fontSize += 2
        }
        else{
          wx.showToast({title: '已经最大了'})
        }
      },
      handleSmall(){
        if(this.fontSize > 10){
          this.fontSize -= 2
        }
        else{
          wx.showToast({title: '已经最小了'})
        }
      },
      handlePrev(){
        if(this.index == this.catalogues.length-1){
          wx.showToast({title: '已经是最后一章了'})
        }else{
          wx.showLoading({
            title: '加载中',
          })
          this.index += 1;
          this.catalogues.forEach(item=>{
            if(item.index == this.index){
              this.titleId =  item._id
              this.getData();
            }
          })
        }
      },
      handlejian(){
        if(this.index == 0){
          wx.showToast({title: '已经是第一章了'})
        }else{
          wx.showLoading({
            title: '加载中',
          })
          this.index -= 1
          this.catalogues.forEach(item=>{
            if(item.index == this.index){
              this.titleId =  item._id
              this.getData();
            }
          })
        }
      },
    },
    watch:{
     title(){
       let title = this.title
       wx.setNavigationBarTitle({
         title
       })
     }
    },
    onShow(){
     this.fontSize = 16
      this.num = '-600rpx'
      this.width = 0
      this.shows = false
    },
    onShareAppMessage (obj) {
      return {
        title: this.catalogues.title,
        path: '/pages/article/main?id=' + this.titleId,
        imageUrl: this.catalogues.img
      }
    },
    onLoad(options){
      this.show = false
      this.titleId =options.id
      this.getData();
      this. handleShow();
    },
  }
</script>
<style src="@/css/iconfont.css"> </style>
<style scoped lang="less">
  .bottom{
    display: flex;
    justify-content: space-between;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    border-top: 1rpx solid #eee;
    border-radius: 0 2px 2px 0 rgba(0,0,0,.2);
    .iconfont {
      font-size: 22px;
      width: 100rpx;
      height: 100rpx;
      line-height: 100rpx;
      text-align: center;
    }
  }
  .click:active {
    background: #f1f1f1;
    color: #fff;
  }
  .catalogue{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    background-color:rgba(0,0,0,.4);
    z-index: 998;
  }
  .wrap{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    height: 100%;
    /*width: 600rpx;*/
    background-color: white;
    z-index: 999;
    transition: transform .5s ease;

    .title-item{
      font-size:28rpx;
      color:#333;
      padding-left: 40rpx;
      line-height: 60rpx;
      height: 60rpx;
      border-bottom: 1px solid #f1f1f1;
      overflow-scrolling: touch;
    }
  }
</style>
