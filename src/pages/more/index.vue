<template>
    <div>
      <div class="item-content">
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
            <p><span>{{ite.author}}</span> <span>两天前 <span>{{title}}{{ite.looknums}}人在看</span></span> </p>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import {axios} from '@/utils/index'
  export default {
   data(){
     return{
       lists:[],
       typeId:'',
        title:''
     }
   },
    methods:{
      getLists(){
        let typeId = this.typeId
        axios.get(`/category/${typeId}/books`).then(res=>{
          this.lists = res.data.books
          this.title = res.data.title
          console.log(this.lists);
          // this.show = true
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
      this. getLists();
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
  .items-details p{
    font-size: 26rpx;
    color: #555;
    display: flex;
    justify-content: space-between;
  }
  }
  }
</style>
