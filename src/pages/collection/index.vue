<template>
    <div>
      <img src="/static/img/Disk-1s-200px.svg" v-show="!show" id="loading">
     <div v-if="show" class="collection">
       <div  v-for="(item,index) in books" :key="index" class="collections">
         <div @touchstart="mytouchstart"
              @touchend="mytouchend"
              @tap="toDetail(item.book._id)">
           <div  class="img-wrap">
             <img :src="item.book.img">
           </div>
           <div>{{item.book.title}}</div>
         </div>
         <icon type="cancel" size="26" color="red" v-show="showIcon" @click="deleteBooks(item.book._id)"/>
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
       touch_end:0,
       id:'',
       showIcon:false,
       num:0
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
      deleteBooks(val){
        let that = this
        wx.showModal({
          title: '提示',
          content: '是否删除书籍',
          success: function(res) {
            if (res.confirm) {
              axios.delete(`/collection/${val}`).then(res=>{
                if(res.code == 200){
                axios.get('/collection?pn=1&size=8').then(res=>{
                  that.books = res.data
                  that.showIcon = false
                })
                }
              })
            } else if (res.cancel) {
              that.showIcon = false
            }
          }
        })
      },
      toDetail(options){
        let touchTime = this.touch_end - this.touch_start;
        if(touchTime<350){
          wx.navigateTo({
            url: `/pages/details/main?id=${options}`
          })
        }else{
          this.showIcon = true
          this.num = 0.7
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
     this.pn = 1
     this.isLoading = true
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
  justify-content: space-between;
  padding:0 14rpx;
  .collections{
    font-size: 24rpx;
    width: 348rpx;
    color: #555;
    text-align: center;
    margin: 54rpx 0 18rpx 12rpx;
    position: relative;
    icon{
      position: absolute;
      top: -40rpx;
      left: 0;
    }
    .img-wrap{
      img{
        height: 260rpx;
        width: 220rpx;
        box-shadow:0 0 4px 3px rgba(0,0,0,.6) ;
      }
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
