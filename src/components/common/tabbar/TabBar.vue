<template>
  <div class="tab-bar">
    <slot></slot>
  </div>
</template>

<script>

  export default {
    name: "TabBar",
    components:{
    }
  }
</script>

<style scoped>
  .tab-bar {
    display:flex;
    background-color: #f6f6f6;
    height:49px;
    font-size: 14px;
    color:#333;
    position:fixed;
    bottom:0;
    right:0;
    left:0;
   box-shadow:0px -1px 1px rgba(150,150,150,.08);
   z-index: 1;
  }

</style>