<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
      <cart-list class="cart-list"></cart-list>
      <bottom-bar></bottom-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"
import CartList from "./childcomp/CartList"
import BottomBar from "./childcomp/BottomBar"


import {mapGetters} from 'vuex'


  export default {
    name: "Cart",
    components:{
      NavBar,
      CartList,
      BottomBar,
    },
    
    computed:{
     ...mapGetters(['cartLength'])
    //   ...mapGetters({
    //     length:"cartLength",
    //   })
    },
  }
</script>

<style scoped>
 .cart {
  height:100vh;
   position: relative;
} 
  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
  }
 
</style>
