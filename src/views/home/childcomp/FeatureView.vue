<template>
  <div class="feature-view">
    <div v-for="item in recommend" class="feature-view-item">
      <a :href="item.link"><img :src="item.image" alt=""></a>
      <div class="feature-title">{{item.title}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "FeatureView",
    props:{
      recommend:{
        type:Array,
      },
    }
  }
</script>

<style scoped>
.feature-view {
  display: flex;
  font-size: 13px;
  text-align: center;
  margin-top: 10px;
  padding-bottom: 30px;
  border-bottom: 8px solid #eee;
}
  .feature-view img {
    width:100%;
  }
  .feature-view-item {
    flex:1;
  }
  .feature-title {
    margin-top: 10px;

  }
</style>