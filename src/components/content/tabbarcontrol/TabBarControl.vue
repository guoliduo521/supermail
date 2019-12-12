<template>
  <div class="tab-bar-control">
    <div class="tab-bar-control-item" v-for="(item,index) in title"
         @click="activeClick(index)" :class="{active: currentIndex === index}" :key="index"
         >
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabBarControl",
    props:{
      title:{
        type:Array,

      }
    },
    data(){
      return {
        currentIndex:0,
      }
    },
    methods:{
      activeClick(index){
        this.currentIndex = index;
        //想home发射tab-control点击事件
        this.$emit("activeClick",index)
      },
    },
  }
</script>

<style scoped>
  .tab-bar-control {
    height:44px;
    background-color: #fff;
    display: flex;
    text-align: center;
    z-index: 9;
    line-height:44px; 
    position:relative;
    
  }
  .tab-bar-control-item {
    flex:1;
  }
  .active {
    color: var(--color-high-text);
  }
  .active span {
    border-bottom: 2px solid var(--color-high-text);
  }
</style>