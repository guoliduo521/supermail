<template>
  <div class="cart-list" >
    <scroll class="content" ref="scroll">
    <cart-list-item v-for="(item,index) in cartList" :product="item" :key="index"></cart-list-item>
    </scroll>   
  </div>
</template>

<script>
  import Scroll from 'components/common/scroll/Scroll'
  import CartListItem  from './CartListItem'


  import {mapGetters} from 'vuex'


export default {
  name:"CartList",
  components:{
    Scroll,
    CartListItem,
  },
  computed:{
    ...mapGetters(['cartList'])
    },
  activared(){
    this.$refs.scrollx.refresh();
    }
}
</script>

<style scoped>
.cart-list {
  
  
} 
.content {
   height:405px;
  overflow: hidden; 
  } 
</style>