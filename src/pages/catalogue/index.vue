<template>
  <div>
      <img src="/static/img/Disk-1s-200px.svg" v-show="!show" id="loading">
    <div class="container" v-if="show">
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
        this.catalogues = []
        axios.get(`/titles/${this.bookId}`).then(res=>{
          this.catalogues = res.data
          this.show = true
        })
      },
      handleclick(val){
        console.log(val);
        wx.navigateTo({
          url: `/pages/article/main?id=${val}`
        })
      }
  },
    onLoad(options){
      this.show = false
      this.bookId = options.id;
      this.getData();
    },
  }
</script>

<style scoped lang="less">
.catalogues{
  font-size:30rpx;
  color:#333;
  padding-left: 40rpx;
  line-height: 60rpx;
  height: 60rpx;
  border-bottom: 1px solid #f1f1f1;
}
  .catalogues:active{
    background-color: #aaa;
  }
</style>
