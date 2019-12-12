<template>
  <div>
    <swiper>
      <swiper-item v-for="(item,index) in banner" :key="index">
        <a :href="item.link"> <img :src="item.image" alt=""  @load="imagesLoad"></a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
  import Swiper from "components/common/swiper/Swiper"
  import SwiperItem from "components/common/swiper/SwiperItem"

  export default {
    name: "HomeSwiper",
    props:{
      banner:{
        type:Array,
      }
    },
    data(){
      return {
        isLoad:false,
      }
    },
    components:{
      Swiper,
      SwiperItem,
    },
    methods:{
      imagesLoad(){
        if(!this.isLoad){
          this.isLoad = true;
          console.log("轮播图加载完毕")
          this.$emit("swiperImagesLoad")
        }
    }
    },
  }
</script>

<style scoped>

</style>