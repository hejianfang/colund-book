<template>
    <div class="container">
      <div>
        <wemark :md="content" link highlight type="wemark"></wemark>
      </div>
    </div>
</template>

<script>
  import {axios} from '@/utils/index'
  export default {
   data(){
     return{
       titleId:'',
       content:''
     }
   },
    methods:{
     getData(){
       axios.get(`/article/${this.titleId}`).then(res=>{
        this.content = res.data.article.content
       })
     }
    },
    onLoad(options){
     this.titleId =options.id
      this.getData();
    }
  };
</script>

<style scoped>

</style>
