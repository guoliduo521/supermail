<template>
  <div id='category'>
    <nav-bar class="nav-bar"><div slot="center">商品分类</div></nav-bar>
    <div class='content'>
    <tab-menu :categories='categories'
              @selectItem='selectItem'></tab-menu>

    <scroll id='tab-content' probetype='1' >
    <tab-content-category :subcategories='showSubcategory'></tab-content-category>
    </scroll>
      </div>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import TabMenu from './childcomp/TabMenu'
import TabBarControl from 'components/content/tabbarcontrol/TabBarControl'
import TabContentCategory from './childcomp/TabContentCategory'
import Scroll from 'components/common/scroll/Scroll'

import {getCategory,getSubcategory} from 'network/category'

export default {
  name:'Category',
  components:{
    NavBar,
    TabMenu,
    TabBarControl,
    TabContentCategory,
    Scroll,
  },
  data(){
    return {
      categories:[],
      categoryData:{
        
      },
      currentIndex: -1,
    }
  },
  created(){
     this.getCategory();
  },
  computed:{
    showSubcategory() {
      if(this.currentIndex == -1) return {}
      return this.categoryData[this.currentIndex].subcategories
    },
  },
  methods:{
    //获取左侧数据
    getCategory(){
      getCategory().then(res =>{
        console.log(res)
        this.categories = res.data.data.category.list
        //2.遍历每个类型的子数据
        for(let i = 0; i < this.categories.length; i++){
          this.categoryData[i] = {
            subcategories: {},
          }
        }
        //请求第一个分类的数据
         this.getSubcategories(0)
      })
    },

    getSubcategories(index) {
       this.currentIndex = index;
       const mailKey = this.categories[index].maitKey;
      getSubcategory(mailKey).then(res =>{
        console.log(res)
        this.categoryData[index].subcategories = res.data.data
        this.categoryData = {...this.categoryData}
      })
    },

    selectItem(index) {
      this.getSubcategories(index)
    }




  }
}
</script>

<style scoped>
#category {
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }

  .content {
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;

    display: flex;
  }

  #tab-content {
    height: 100vh;
    flex: 1;
  }
</style>