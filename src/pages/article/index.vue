<template>
  <div>
    <div v-if="!shows" id="loading">
      <img src="/static/img/loading1.gif">
    </div>
    <div class="container" v-else="shows">
      <div :style="{fontSize:fontSize + 'px'}">
        <wemark :md="content" link highlight type="wemark"></wemark>
      </div>
      <div class="catalogue" v-show="show" @click="handleShows"></div>
      <scroll-view :scroll-y="true" class="wrap" :style="{transform:'translateX(' + num + ')',width:width + 'rpx'}">
        <div v-for="(item,index) in catalogues"
             @click="handleclick(item._id)"
             :style="item._id == titleId?'background:#ccc':''"
             :key="index"
        class="title-item">
          {{item.title}}
        </div>
      </scroll-view>
      <div class="bottom">
        <img src="/static/img/left.png" @click="handlejian">
        <img src="/static/img/list.png" @click="handleShows">
        <img src="/static/img/daa.png" @click="handleBig">
        <img src="/static/img/da.png" @click="handleSmall">
        <img src="/static/img/right.png" @click="handlePrev">
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
       show:false,
       catalogues:[],
       fontSize:50,
       index:0,
       shows:false,
       title:'',
       num:'-600rpx',
       width:'0'
     }
   },
    methods:{
     getData(){
       axios.get(`/article/${this.titleId}`).then(res=>{
        this.content = res.data.article.content
         this.title = res.data.title
         this.shows= true
       })
     },
      handleclick(val){
        this.handleShows()
        this.titleId = val;
        this.getData();
      },
      handleShows(){
        this.show = !this.show
        if(this.show){
           this.num = 0
          this.width = 600
        }else{
          this.num = '-600rpx'
        }
      },
      handleShow(){
       let bookId = this.$store.state.bookId
        axios.get(`/titles/${bookId}`).then(res=>{
          this.catalogues = res.data
          this.shows= true
          res.data.forEach(item=>{
            if(item._id == this.titleId){
              this.index = item.index
            }
          })
        })
      },
      handleBig(){
       this.fontSize += 4
      },
      handleSmall(){
        this.fontSize -= 4
      },
      handlePrev(){
      this.index += 1;
        this.catalogues.forEach(item=>{
          if(item.index == this.index){
            this.titleId =  item._id
            this.getData();
          }
        })
      },
      handlejian(){
        this.index -= 1
        this.catalogues.forEach(item=>{
          if(item.index == this.index){
            this.titleId =  item._id
            this.getData();
          }
        })
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
      this.num = '-600rpx'
      this.width = 0
      this.show = false
    },
    onLoad(options){
      this.titleId =options.id
      this.getData();
      this. handleShow();
    },

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
  .bottom{
    display: flex;
    justify-content: space-around;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    padding: 10px 0 16px;
    img{
      height: 30px;
      width: 20px;
    }
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
    }
  }


  /*.ziti{*/
    /*font-size: {{fontSize}};*/
  /*}*/
</style>
