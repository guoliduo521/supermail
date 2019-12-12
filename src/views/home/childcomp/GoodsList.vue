<template>
  <div class="goods-list"  >
     <goods-list-item v-for="(item,index) in goods" :goods-item="item" :key="index" :good-item="item">
     </goods-list-item>
    
    </div>
  </div>
</template>

<script>
   import GoodsListItem from "./GoodsListItem"
  export default {
    name: "GoodsList",
    components:{
      GoodsListItem,
    },
    props:{
      goods:{
        type:Array,
      }
    }
  }
</script>

<style scoped>
  .goods-list {
    display:flex;
     flex-wrap:wrap; 
    justify-content: space-around;
    padding: 3px; 
  }
</style>