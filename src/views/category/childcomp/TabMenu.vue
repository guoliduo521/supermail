<template>
 <scroll id="tab-menu">
   <div class='tab-menu'>
     <div class='tab-menu-item' 
      v-for='(item,index) in categories' 
      :key='index'
      @click='itemClick(index)'
      :class='{active: index === currentIndex}'>
       {{item.title}}
     </div>
   </div>
  </scroll>
</template>

<script>
 import Scroll from 'components/common/scroll/Scroll'

	export default {
		name: "TabMenu",
    components: {
		  Scroll
    },
    props: {
		  categories: Array
    },
    data() {
		  return {
        currentIndex: 0,
        
      }
    },
    methods: {
		  itemClick(index) {
        this.currentIndex = index
        this.$emit('selectItem', index)
      }
    }
	}
</script>

<style scoped>
  #tab-menu {
    background-color: #f6f6f6;
    height: 100%;
    width: 100px;
    box-sizing: border-box;
  }
  .tab-menu{
     width:100px; 
  }

  .tab-menu-item{
    height:45px;
    line-height:45px;
    text-align:center;
    font-size:14px;
  }
  .tab-menu-item.active {
    font-weight: 700;
    color: var(--color-height-text);
    background-color: #fff;
    border-left: 3px solid var(--color-high-text);
  }

</style>


