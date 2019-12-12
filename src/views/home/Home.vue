<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-bar-control :title="['流行','新款','精选']" 
      @activeClick="activeClick" 
      v-show="isTabFixed"
      class="tab-bar-control2"
      ref="tabControl2"></tab-bar-control>

    <scroll class="content" ref="scroll" @homeScroll="contentScroll" :probeType="3" :pullUpLoad="true"
    @pullingUp="loadMove" > 
    <home-swiper :banner="banner" @swiperImagesLoad="swiperImagesLoad"></home-swiper>
    <feature-view :recommend="recommend"></feature-view>
    <recommend></recommend>
    <tab-bar-control :title="['流行','新款','精选']" @activeClick="activeClick" ref="tabControl1"></tab-bar-control> 
     <goods-list :goods="goods[this.currentIndex].list"></goods-list>
     </scroll>
    <back-top @click.native="backClick" v-show="isShow"></back-top>
   
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar"
  import HomeSwiper from "./childcomp/HomeSwiper"
  import FeatureView from "./childcomp/FeatureView"
  import Recommend from "./childcomp/Recommend"
  import TabBarControl from "components/content/tabbarcontrol/TabBarControl"
  import Scroll from "components/common/scroll/Scroll"
  import GoodsList from "./childcomp/GoodsList"
  import BackTop from "components/content/backtop/BackTop"

  import {debounce} from "common/until"

  import {getHomeData,getHomeGoods} from "network/home"
  import {itemListenerMixin} from "common/mixin";

  export default {
    name: "Home",
    mixins:[itemListenerMixin],
    data(){
      return {
        banner:[],
        recommend:[],
        goods:{
          "pop" : {page:0,list:[]},
          "new" : {page:0,list:[]},
          "sell" : {page:0,list:[]},
        },
        currentIndex:"pop",
        tabOffsetTop:0,
        isTabFixed:false,
        saveY:0,
        itemImgListener:null,
      }
    },
    components:{
      NavBar,
      HomeSwiper,
      FeatureView,
      Recommend,
      TabBarControl,
      Scroll,
      GoodsList,
      BackTop,
    },
    created(){
      this.getHomeData();
      this.getHomeGoods("pop");
      this.getHomeGoods("new");
      this.getHomeGoods("sell");
    },
    mounted(){
      // let newRefresh=debounce(this.$refs.scroll.refresh,5000)
      // this.$bus.$on("itemImageLoad",itemImgListener)
      // this.itemImgListener = ()=>{
      //   newRefresh();
      // }
    },
    deactivated(){
        this.saveY = this.$refs.scroll.getScrollY();
        this.$bus.$off("itemImageLoad",)
      },
    activated(){
       this.$refs.scroll.scrollTo(0,this.saveY);
    },
    methods:{
      //接受scroll发出的home页的位置监听
      contentScroll(position){
         this.isShow = -(position.y) >1500;

        //tabbarcontrol的吸顶效果
        this.isTabFixed = -(position.y) >this.tabOffsetTop;
      },

      //接受homeswiper图片加载完成事件
      swiperImagesLoad(){
        console.log("轮播图事件接收完成")
        // this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
        this.tabOffsetTop=this.$refs.tabControl1.$el.offsetTop
      },
     
      

      //接受tab-control发射的点击事件
      activeClick(index){
        switch(index){
          case 0:
            this.currentIndex = "pop"
            break;
          case 1:
            this.currentIndex = "new"
            break;
          case 2:
            this.currentIndex = "sell"
            break;
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;        

      },
      //接受scroll上拉加载更多的事件
      loadMove(){
        this.getHomeGoods(this.currentIndex);
      },

      

      /*
      网络请求
       */

      //接受home页的数据请求
      getHomeData(){
        getHomeData().then(res =>{
          this.banner = res.data.data.banner.list;
          this.recommend = res.data.data.recommend.list;
        })
        },

      //接受home页详情商品的数据
      getHomeGoods(type){
        // getHomeGoods(type,this.goods[type].page).then(res =>{
        //   const goodsList = res.data.data.list;
        //   this.goods[type].list.push(...goodsList);
        //   this.goods[type].page += 1;

        const page =this.goods[type].page +1;
        getHomeGoods(type,page).then(res =>{
          console.log(res);
          this.goods[type].list.push(...res.data.data.list)
          this.goods[type].page +=1;

          this.$refs.scroll.finishPullUp();
        })
      
       
      },

      //接受home页商品



    }
  }
</script>

<style scoped>
 #home {
   height:100vh;
 }
  .content {
    position: absolute;
    top:49px;
    bottom:49px;
    right:0;
    left:0;
  }
  .tab-bar-control2{
    position:fixed;
    top:44px;
    right:0;
    left:0;
  }
  .home-nav {
    text-align: center;
    background-color: var(--color-tint);
    color:#fff;
  }

 
</style>