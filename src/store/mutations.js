import {ADD_COUNTER,ADD_TO_CART}  from "./mutationstype" 

export default{
    //mutations唯一的目的就是修改state里的状态；
    //mutations中的每一个方法尽能完成的事情比较单一一点；
    [ADD_COUNTER](state,payload){
      payload.count++;
      
    },
    [ADD_TO_CART](state,payload){
      payload.checked = true
      state.cartList.push(payload)
      
      
    }
  }