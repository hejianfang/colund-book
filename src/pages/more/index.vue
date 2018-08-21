<template>
    <div>
      <img src="/static/img/Disk-1s-200px.svg" v-show="!show" id="loading">
      <div class="item-content container" v-if="show">
        <div class="content-top">
          <div class="content-wraps"><span>|</span><span>{{title}}</span></div>
        </div>
        <div class="items-wrap" v-for="(ite,index) in lists" :key="index" @click="handleClickid(ite._id)">
          <img :src="ite.img">
          <div class="items-details">
            <div class="items-detail">
              <p>{{ite.title}}</p>
              <p>{{ite.desc}}</p>
            </div>
            <div class="qwerhj">
              <div>{{ite.author}}</div>
              <div class="ertyuiopp"><timer :time="ite.updateTime"></timer><div>{{item.title}}{{ite.looknums}}人在看</div></div>
            </div>
          </div>
        </div>
      </div>
      <div class="jiazai" v-if="show">
        <div v-show="done">已全部加载</div>
      </div>
    </div>
</template>

<script>
  import timer from '@/components/timer'
  import {axios} from '@/utils/index'
  export default {
    components:{
      timer
    },
   data(){
     return{
       lists:[],
       typeId:'',
        title:'',
       done:false,
       onbottom:true,
       pn:1,
       show:false
     }
   },
    methods:{
      getLists(){
        let typeId = this.typeId
        let pn = this.pn
        axios.get(`/category/${typeId}/books?pn=${pn}&size=5`).then(res=>{
          if(res.data.books.length == 0){
            this.done = true
            this.onbottom = false
          }else{
            this.lists = this.lists.concat(res.data.books)
            this.title = res.data.title
            this.show = true
          }
        })
      },
      handleClickid(val){
        wx.navigateTo({
          url: `/pages/details/main?id=${val}`
        })
      },
    },
    onLoad(options){
      this.typeId = options.id
      this.getLists();
    },
    onReachBottom(){
      if(this.onbottom){
        this.pn += 1
        this.getLists()
      }
    },
    onUnload(){
     this.lists = []
    },
    watch:{
      title(){
        let title = this.title
        wx.setNavigationBarTitle({
          title
        })
      }
    }
  };
</script>

<style scoped lang="less">
  .item-content{
  .content-top{
    margin: 20rpx 0;
    display: flex;
    justify-content: space-between;
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
    .items-details .qwerhj{
      font-size: 26rpx;
      color: #555;
      display: flex;
      justify-content: space-between;
      .ertyuiopp{
        display: flex;
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
