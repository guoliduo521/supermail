<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
     <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from "better-scroll"
  export default {
    name: "Scroll",
    data(){
      return{
        scroll:{},
      
      }
    },
    props:{
      probeType:{
        Type:Number,
        default:0,
      },
      pullUpLoad:{
        type:Boolean,
        default:true,
      }
    },
    mounted(){
      this.scroll = new BScroll(this.$refs.wrapper,{
        click:true,
        probeType:this.probeType,
        pullUpLoad: this.pullUpLoad,
      })

      this.scroll.on("scroll",position=>{
        this.$emit("homeScroll",position)
      })

      this.scroll.on("pullingUp",()=>{
        this.$emit("pullingUp")
      })
    },

    methods:{
      //返回指定位置
       scrollTo(x,y,time){
         this.scroll.scrollTo(x,y,time);
      },
      finishPullUp(){
        this.scroll.finishPullUp();
      },
       refresh() {
         //判断this.refresh存在
        this.scroll && this.scroll.refresh();
        console.log("刷新");
       },
       getScrollY(){
         return this.scroll ? this.scroll.y : 0;
       }

    }
  }
</script>

<style scoped>

</style>