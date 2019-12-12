<template>
 <div>
  <swiper class="swipers">
    <swiper-item v-for="(item,index) in topImages" :key="index" class="swiper-items">
      <img :src="item" alt="">
    </swiper-item>
  </swiper>
 </div>
</template>

<script>
import Swiper from "components/common/swiper/Swiper"
import SwiperItem from "components/common/swiper/SwiperItem"

export default {
  name:"DeatilSwiper",
  components:{
      Swiper,
      SwiperItem,
  },
  props:{
    topImages:{
      type:Array,

    }
  }
  
    
}
</script>

<style>
  .swiper-items {
    height:300px;
  }
</style>