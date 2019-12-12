<template>
  <div class="bottom-bar">
    <div class='check-content'>
    <check-button class='check-button' 
    :is-checked='isSelectAll'
    @click.native='checkClick'/>
    <span>全选</span>  
    </div>
    <div class='price'>
      合计：{{totalPrice}}
    </div>
    <div class='calculate'>
      去计算( {{checkLength}} )
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkbutton/CheckButton'

export default {
  name:"BottomBar",
  components:{
    CheckButton,
  },
  computed:{
    totalPrice(){
      return '￥' + this.$store.state.cartList.filter(item =>{
        return item.checked
      }).reduce((preValue,item) =>{
        return preValue + item.price*item.count
      },0)
    },
    checkLength(){
      return this.$store.state.cartList.filter(item =>item.checked).length
    },
    isSelectAll(){
      // return !(this.$store.state.cartList.filter(item =>!item.checked).length)
      if(this.$store.state.cartList.length === 0){
        return false;
      } 
      return !this.$store.state.cartList.find(item => !item.checked); 
    }
  },
  methods:{
    checkClick(){
     if(this.isSelectAll){
       this.$store.state.cartList.forEach(item => item.checked = false);
     }else {
       this.$store.state.cartList.forEach(item => item.checked =true)
     }
    },

   
  }
}
</script>

<style scoped>
.bottom-bar {
  height:40px;
  background-color:#eee;
  line-height: 40px;
  position:relative;
  display:flex;
  font-size: 14px;
  
 
}
.check-content {
  display:flex;
  align-items: center;
  margin-left: 10px;
  width:60px;

}

.check-button {
  width:20px;
  height:20px;
  line-height: 20px;
  margin-right: 5px;
}
.price {
  margin-left: 30px;
  flex:1;
 
}
.calculate {
  /* margin-left: 62px;
  margin-right: -8px; */
  background-color: red;
  width:80px;
}
</style>