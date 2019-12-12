<template>
  <div class="detail">
    <detail-nav-bar class="detail-nav" @backHome="backHome" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class='centent' ref="scroll" @homeScroll="contentScroll" :probeType="3">
    

    <detail-swiper :top-images="topImages"></detail-swiper>
     <detail-base-info :goods="goods"></detail-base-info>
     <detail-shop-info :shop="shop"></detail-shop-info>
     <detail-goods-info :detail-info="detailInfo" @detailImageLoad="imageLoad"></detail-goods-info>
     <detail-param-info :param-info="paramInfo" ref="params"></detail-param-info>
     <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
     <goods-list :goods="recommends" ref="recommend"></goods-list>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShow"></back-top>

    <!-- <toast :message="message" :show='show'/> -->
  </div>
</template>

<script>
import DetailNavBar from "./childcomp/DetailNavBar"
import DetailSwiper from "./childcomp/DetailSwiper"
import Scroll from "components/common/scroll/Scroll"
import DetailBaseInfo from "./childcomp/DetailBaseInfo"
import DetailShopInfo from "./childcomp/DetailShopInfo"
import DetailGoodsInfo from "./childcomp/DetailGoodsInfo"
import DetailCommentInfo from "./childcomp/DetailCommentInfo"
import DetailParamInfo from "./childcomp/DetailParamInfo"
import GoodsList from "views/home/childcomp/GoodsList"
import DetailBottomBar from "./childcomp/DetailBottomBar"
import BackTop from "components/content/backtop/BackTop"

import {getDetailData,Goods,Shop,goodsParam,getRecommend} from "network/detail"
import {itemListenerMixin} from "common/mixin";
import {debounce}  from "common/until"

import {mapActions} from 'vuex'

// import Toast from 'components/common/toast/Toast'


export default {
  name:"Detail",
  components:{
    DetailNavBar,
    DetailSwiper,
    Scroll,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailCommentInfo,
    DetailParamInfo,
    GoodsList,
    DetailBottomBar,
    BackTop,
    // Toast,

  },
  mixins:[itemListenerMixin],
    data(){
      return{
        iid:null,
        saveY:0,
        topImages:[],
        goods:{},
        shop:{},
        detailInfo:{},
        paramInfo:{},
        commentInfo:{},
        recommends:[],
        themeTopYs:[],
        currentIndex:0,
      }
    },
    created(){
      this.iid = this.$route.params.iid
      getDetailData(this.iid).then(res=>{
        //获取详情页数据；
        const data1 = res.data.result;
        console.log(res);
        //获取轮播图数据
        this.topImages = res.data.result.itemInfo.topImages;
        //获取商品数据
        this.goods = new Goods(data1.itemInfo,data1.columns,data1.shopInfo.services);
        console.log(this.goods)
        //获取店铺信息
        this.shop = new Shop(data1.shopInfo)
        //保存商品的详情数据
        this.detailInfo = data1.detailInfo;
        //获取参数信息
        this.paramInfo = new goodsParam(data1.itemParams.info,data1.itemParams.rule)
        //获取评论信息参数
        if(data1.rate.cRate !==0){
          this.commentInfo = data1.rate.list[0];
        }

        getRecommend().then(res=>{
        this.recommends = res.data.data.list
      })
      })
      
      //对给getThemeTopsY赋值的操作进行防抖
      this.getThemeTopY = debounce(()=>{
        console.log("-----")
        this.themeTopYs = [];
         this.themeTopYs.push(0);
         this.themeTopYs.push(this.$refs.params.$el.offsetTop);
         this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
         this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
         console.log(this.themeTopYs);
      })
    },
   
    destroyed() {
      this.$bus.$off("itemImageLoad",this.itemImageListener)
    },
    mounted(){
      
    },
    methods:{
    //映射actions里的函数
    ...mapActions(['addCart']),



      backHome(){
        this.$router.back();
      },
       imageLoad(){
        //刷新
        this.newRefresh();
        this.getThemeTopY();
      },

       titleClick(index){
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
      },

      //监听scroll的滚动
      contentScroll(position){
        this.isShow = -(position.y) >1500;
        const positionY = -position.y;
        //2.positionY和主题中的值进行对比；
        const length=this.themeTopYs.length;
        for(let i= 0;i<length; i++){
          //for...in..遍历出来的i是一个字符串
          if(this.currentIndex !== i &&((i< length - 1 && positionY >=this.themeTopYs[i] && positionY <this.themeTopYs[i+1])||(i === length-1 && positionY >this.themeTopYs[i]))){
            this.currentIndex =i;
            this.$refs.nav.currentIndex = this.currentIndex;
          }
        }
      },

      //addToCart加入到购物车
      addToCart(){
         const product ={};
         product.image = this.topImages[0];
         product.title = this.goods.title;
         product.desc = this.goods.desc;
         product.price = this.goods.realPrice;
         product.iid = this.iid;
        
        // //2.放入购物车
        // //this.$store.cartList.push(product);
         //this.$store.commit("addCart",product);

        //第一种方法
        //  this.$store.dispatch('addCart',product).then(res =>{
        //    console.log(res)
        //  })

        //第二中方法 映射action的函数
        this.addCart(product).then(res =>{

          //麻烦的toast组件使用
        // this.show = true;
        // this.message = res;

        // setTimeout(()=>{
        //   this.show = false;
        //   this.message = '';
        // },1500)

        // this.$toast.show(res,2000)
        //   console.log(res)
        
        console.log(this.$toast)
        this.$toast.show(res,2000)
        })
      
         
      }

    },
   
}
</script>

<style scoped>
.detail{
  position:relative;
  height: 100vh;
  z-index: 9;
  background-color: #fff;
}
  .centent {
    height: calc(100% - 48px);
    overflow: hidden;
    }

 
</style>