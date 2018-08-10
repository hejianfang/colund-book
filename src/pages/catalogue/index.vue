<template>
   <div class="container">
     <div v-for="(item,index) in catalogues"
          :key="index"
          @click="handleclick(item._id)"
          class="catalogues">
       {{item.title}}
     </div>
   </div>
</template>

<script>
  import {axios} from '@/utils/index'
  export default {
   data(){
     return{
       catalogues:[],
       bookId:''
     }
   },
    methods:{
      getData(){
        axios.get(`/titles/${this.bookId}`).then(res=>{
          console.log(res);
          this.catalogues = res.data
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

<style scoped>
.catalogues{
  margin-top: 20rpx;
}
  .catalogues:active{
    background-color: #ccc;
  }
</style>
