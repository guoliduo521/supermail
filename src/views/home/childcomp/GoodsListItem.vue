<template>
  <div class="goods-item" @click="itemClick"> 
    <img :src="showImage" alt="" @load="imagesLoad">
    <div class="goods-info">
    <p>{{goodsItem.title}}</p>
    <span class="price">{{goodsItem.price}}</span>
    <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props:{
      goodsItem:{
        type:Object,
      }
    },
    computed:{
       showImage(){
        return this.goodsItem.image || this.goodsItem.show.img
      },
    },
    methods:{
      imagesLoad(){
       this.$bus.$emit("itemImageLoad")
       },
       itemClick(){
         this.$router.push("/detail/" + this.goodsItem.iid)
       }
    }
  }
</script>

<style scoped>
  .goods-item {
    width:48%;
    padding-bottom:20px;
    position:relative;
    font-size: 12px;
    text-align: center;
  }
  .goods-item img {
    width:100%;
    border-radius: 5px;
  }
  .goods-item p{
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    margin-bottom:3px;
  }
  .goods-item .price {
     color: var(--color-high-text);
    margin-right:20px;
  }
  .goods-info .collect {
    position:relative;
  }
  .goods-info .collect::before {
    content:"";
    position:absolute;
    left:-15px;
    top:-1px;
    width:14px;
    height:14px;
    background: url("~assets/img/tabbar2/view_off.png") 0 0/14px 14px;
  }

</style>