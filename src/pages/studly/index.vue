<template>
    <div>
      <img src="/static/img/Disk-1s-200px.svg" v-show="!show" id="loading">
      <div class="container" v-if = 'show'>
        <div v-show="dones" id="dones">你还没有阅读过书籍...</div>
        <div class="item-wrap" v-show="!dones" v-for="(item,index) in readList" :key="index">
          <img :src="item.book.img">
          <div class="content-right">
            <div class="content-title">{{item.book.title}}</div>
            <div>书籍{{item.title.index + 1}}/{{item.title.total}}章节</div>
            <div class="progress-wrap">
              <div class="progress">
                <progress :percent="item.percent"
                             :active="true"
                             :stroke-width="4"
              />
              </div>
              <span>已看{{item.percent}}%</span>
            </div>
            <div class="getLooks" id="ziti">
              <div >上次查看:{{item.title.title}}</div>
              <div><timer :time="item.updatedTime"></timer></div>
            </div>
            <div class="button">
              <button type="default" size="mini" @click="counteRead(item.title._id,item.title.bookId)">继续阅读</button>
              <button type="default" size="mini" @click="getLookdocx(item.book._id)">查看文档</button></div>
          </div>
        </div>
      </div>
      <div class="jiazai" v-if="show">
        <div v-show="doneAll">{{jiazai?"上拉加载更多...":"正在加载中..."}}</div>
        <div v-show="done">已全部加载</div>
      </div>
    </div>
</template>

<script>
  import {axios} from '@/utils/index'
  import timer from '@/components/timer'
  export default {
    data(){
      return{
        readList:[],
        show:false,
        dones:false,
        pn:1,
        isLoading:true,
        jiazai:true,
        done:false,
        doneAll:true
      }
    },
    components:{
      timer
    },
    methods:{
      getReadList(){
        let pn = this.pn
        axios.get(`/readList?pn=${pn}&size=4`).then(res=>{
          if(res.code == 200){
            if(res.data.length == 0){
              this.isLoading = false
              this.done = true
              this.doneAll = false
            }else if(res.data.length < 4){
              this.done = true
              this.doneAll = false
              this.readList =this.readList.concat(res.data.map(item=>{
                item.percent = Math.ceil((item.title.index + 1)/item.title.total*100)
                return item
              }))
            }else{
              this.doneAll = true
              this.readList =this.readList.concat(res.data.map(item=>{
                item.percent = Math.ceil((item.title.index + 1)/item.title.total*100)
                return item
              }))
              this.jiazai = true
            }
          }else{
            this.doneAll = false
            wx.showModal({
              title: '提示',
              content: res.msg,
              success: function(res) {
                if (res.confirm) {
                  wx.navigateTo({
                    url: '/pages/login/main'
                  })
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          }
          this.show = true
          wx.hideLoading()
        })
      },
      getLookdocx(val){
        wx.navigateTo({
          url: `/pages/details/main?id=${val}`
        })
      },
      counteRead(val,res){
        this.$store.commit('increment',res)
        wx.navigateTo({
          url: `/pages/article/main?id=${val}`
        })
      }
    },
      onPullDownRefresh(){
        let that = this
        wx.setBackgroundTextStyle({
          textStyle: 'dark', // 下拉背景字体、loading 图的样式为dark
        })
        that.pn = 1
        that.doneAll = false
        that.done = false
        that.isLoading = true
        that.readList = []
        wx.showLoading({
          title: '刷新中',
        })
        that.getReadList();
        wx.stopPullDownRefresh()
      },
    onLoad(){
      this.getReadList();
      if(this.readList){
        this.dones = false
      }else{
        this.dones = true
      }
    },
    onReachBottom(){
      this.jiazai = false
      if(this.isLoading){
        this.pn += 1
        this.getReadList();
      }
    },
  };
</script>

<style scoped lang="less">
  #dones{
    text-align: center;
    font-size: 36rpx;
    color:#666;
    margin-top: 30%;
  }
  .item-wrap{
    display: flex;
    margin-bottom: 42rpx;
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
    .getLooks{
      display: flex;
      justify-content: space-between;
    }
    #ziti{
      font-size: 20rpx;
    }
    .button{
      display: flex;
      margin-left: 0;
      justify-content: space-between;
    }
    .progress-wrap{
      width: 100%;
      display: flex;
      justify-content: space-between;
      .progress{
        width: 70%;
        padding-top:16rpx;
      }
      span{
        font-size: 22rpx;
      }
    }
  .content-title{
    font-size: 30rpx;
    font-weight: 600;
    color: #000;
  }
  .content-title~div{
    font-size: 26rpx;
    color: #888;
  }
  }
  }
  .jiazai{
    text-align: center;
    font-size: 30rpx;
    color:#888;
    height: 40rpx;
    padding-bottom: 10px;
  }
</style>
