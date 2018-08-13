<template>
  <div>
    <div v-if="!show" id="loading">
      <img src="/static/img/loading1.gif">
    </div>
    <div class="container" v-else="show">
      <div v-for="(item,index) in catalogues"
           :key="index"
           @click="handleclick(item._id)"
           class="catalogues">
        {{item.title}}
      </div>
    </div>
  </div>
</template>

<script>
  import {axios} from '@/utils/index'
  export default {
   data(){
     return{
       catalogues:[],
       bookId:'',
       show:false
     }
   },
    methods:{
      getData(){
        axios.get(`/titles/${this.bookId}`).then(res=>{
          this.catalogues = res.data
          this.show = true
        })
      },
      handleclick(val){
        wx.navigateTo({
          url: `/pages/article/main?id=${val}`
        })
      }
  },
    onLoad(options){
      this.bookId = options.id;
      this.getData();
    }
  }
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
.catalogues{
  margin-top: 20rpx;
}
  .catalogues:active{
    background-color: #ccc;
  }
</style>
