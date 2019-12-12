import {debounce}  from "common/until"
export const itemListenerMixin = {
  data(){
    return {
      itemImageListener:null,
      newRefresh:null,
      isShow:false,
    }
  },
  methods:{
    backClick(){
         this.$refs.scroll.scrollTo(0,0,500)
      },
  },
  mounted(){
    this.newRefresh = debounce(this.$refs.scroll.refresh,500)
    this.itemImageListener = ()=>{
      this.newRefresh();
    }
    this.$bus.$on("itemImageLoad",this.itemImageListener)
    console.log("混入完成")
  }
}