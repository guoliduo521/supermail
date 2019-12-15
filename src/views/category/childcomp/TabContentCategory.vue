<template>
  <div >
    <grid-view :cols="3" :lineSpace="15" :v-margin="20" v-if="subcategories.list" class='panel'>
      <div class="item" v-for="(item, index) in subcategories.list" :key="index">
        <a :href="item.link">
          <img class="item-img" :src="item.image" alt="">
          <div class="item-text">{{item.title}}</div>
        </a>
      </div> 
    </grid-view>
  </div>
</template>

<script>
  import GridView from 'components/common/gridView/GridView'

  export default {
    name: "TabContentCategory",
    components: {
      GridView
    },
    props: {
      subcategories: {
        type: Object,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .panel{
    display:flex;
  }
  .item {
    flex:1;
    text-align: center;
    font-size: 12px;
  }

  .item-img {
    width: 50.39px;
    height:50.39px;
  }

  .item-text {
    margin-top: 15px;
  }
</style>
