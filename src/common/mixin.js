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

export const tabControlMixin = {
  data: function () {
    return {
      currentType: 'pop'
    }
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      console.log(this.currentType);
    }
  }
}
