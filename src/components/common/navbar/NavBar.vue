<template>
  <div class="nav-bar">
      <div class="left"><slot name="left"></slot></div>
      <div class="center"><slot name="center"></slot></div>
      <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
  export default {
    name: "NavBar"
  }
</script>

<style scoped>
  .nav-bar {
    position: relative;
    top:0;
    right:0;
    left:0;
    height:49px;
    display: flex;
    z-index: 9;
    text-align: center;
    line-height: 49px;
    font-size: 16px;
    box-shadow: 0 1px 1px rgba(100,100,100,.1);
  }

  .left {
    width:49px;
  }

  .center {
    flex:1;
  }

  .right {
    width:49px;
  }
</style>