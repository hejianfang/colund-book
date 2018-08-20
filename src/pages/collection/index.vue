<template>
    <div>
      <img src="/static/img/Disk-1s-200px.svg" v-show="!show" id="loading">
     <div v-if="show" class="collection">
       <div v-for="(item,index) in books" :key="index"
            class="collections"
            @touchstart="mytouchstart"
            @touchend="mytouchend"
            @tap="toDetail(item.book._id)">
         <img :src="item.book.img">
         <div>{{item.book.title}}</div>
       </div>
     </div>
      <div class="jiazai" v-if="show">
        <div v-show="doneAll">{{jiazai?"上拉加载中...":"正在加载中..."}}</div>
        <div v-show="done">已全部加载</div>
      </div>
    </div>
</template>

<script>
  import {axios} from '@/utils/index'
  export default {
   data(){
     return{
       books:[],
       pn:1,
       isLoading:true,
       jiazai:true,
       show:false,
       done:false,
       doneAll:true,
       touch_start:0,
       touch_end:0
     }
   },
    methods:{
      getCollection(){
        let pn = this.pn
        axios.get(`/collection?pn=${pn}&size=8`).then(res=>{
          if(res.data.length == 0){
            this.isLoading = false
            this.done = true
            this.doneAll = false
          }else if(res.data.length < 8){
            this.done = true
            this.show = true
            this.doneAll = false
            this.books = this.books.concat(res.data)
          }
          else{
            this.books = this.books.concat(res.data)
            this.jiazai = true
            this.show = true
          }
        })
      },
      mytouchstart (e) {
          this.touch_start= e.timeStamp
      },
      mytouchend (e) {
         this.touch_end = e.timeStamp
      },
      toDetail(options){
        let touchTime = this.touch_end - this.touch_start;
        if(touchTime<350){
          wx.navigateTo({
            url: `/pages/details/main?id=${options}`
          })
        }else{
           console.log('长按')
        }
      }
    },
    onReachBottom(){
      this.jiazai = false
    if(this.isLoading){
      this.pn += 1
      this.getCollection();
    }
    },
   onLoad(){
     this.getCollection();
   },
    onUnload(){
     this.books = []
    }
  };
</script>

<style scoped lang="less">
.collection{
  display: flex;
  flex-wrap: wrap;
  padding:  0 14rpx;
  .collections{
    font-size: 24rpx;
    width: 348rpx;
    color: #555;
    text-align: center;
    margin: 14rpx 0 18rpx 12rpx;
    img{
      height: 260rpx;
      width: 220rpx;
      box-shadow:0 0 4px 3px rgba(0,0,0,.6) ;
    }
  }
}
  .jiazai{
    text-align: center;
    font-size: 30rpx;
    color:#888;
    margin: 20rpx 0;
  }
</style>
