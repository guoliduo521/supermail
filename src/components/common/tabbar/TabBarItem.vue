<template>
  <div class="tab-bar-item">
 <div class="item-icon" v-show="!isActive" @click="itemClick"><slot name="icon"></slot></div>
 <div class="item-icon-active" v-show="isActive"><slot name="icon-active"></slot></div>
 <div class="item-text" :style="activeStyle" ><slot name="icon-text"></slot></div>
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props:{
      path:{
        type:String,
      }

    },
    data(){
      return {

      }
    },
    computed:{
     isActive(){
         return this.$route.path.indexOf(this.path) !== -1;
      },
      activeStyle(){
       return this.isActive ? {color:"red"} : {}
      }
    },
    methods:{
      itemClick(){
        if(this.path !== this.$route.path){
          this.$router.replace(this.path)
        }
      },
    },
  }
</script>

<style scoped>
  .tab-bar-item {
    flex:1;
    text-align: center;
  }

  .item-icon img {
    height:24px;
    width:24px;
    vertical-align: middle;
    margin-top:5px;
    margin-bottom: 3px;
  }

  .item-icon-active img {
    height:24px;
    width:24px;
    vertical-align: middle;
    margin-top:5px;
    margin-bottom: 3px;
  }

  .item-text {
    font-size: 12px;
    margin-top: 3px;
    color: #333;
  }

</style>