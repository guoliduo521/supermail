<template>
  <div class="detail-nav-bar">
    <nav-bar>
      <div slot="left" @click="backHome" class="left">
          <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="center">
        <div v-for="(item,index) in titles" :key="index" class='center-item' 
        @click="itemClick(index)" :class="{active:currentIndex == index}">
        {{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import  NavBar from "components/common/navbar/NavBar"

export default {
    name:"DetailNavBar",
    components:{
        NavBar,
    },
    data(){
        return{
            titles:["商品","参数","评论","推荐"],
            currentIndex:0,
        }
    },
    methods:{
      backHome(){
        this.$emit("backHome")
      },
      itemClick(index){
        this.currentIndex = index;
        this.$emit("titleClick",index)
      }
    }

}
</script>

<style scoped>
  .detail-nav-bar {
    position: relative;
   
  }
   .center {
     display: flex;
     font-size:15px;
     
   }
   .center-item {
     flex:1;
   }


  .detail-nav-bar img{
      height:35px;
      width:35px;
      margin-top: 6px;
  }
  .active {
    color:red;
  }
</style>