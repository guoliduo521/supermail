import {ADD_COUNTER,ADD_TO_CART}  from "./mutationstype" 

export default {
    addCart(context,payload){
     return new Promise((resolve,reject) =>{
      let oldProduct = null;
      for(let item of context.state.cartList){
        if(item.iid === payload.iid){
          oldProduct = item;
        }
      }
      
      if(oldProduct){//数量+1
       // oldProduct.count +=1;
       context.commit(ADD_COUNTER,oldProduct)
       resolve('当前的商品数量加1')
      }else {  //添加新商品
        payload.count = 1;
        // state.cartList.push(payload);
        context.commit(ADD_TO_CART,payload);
        resolve('添加新商品')
      }
     })
  }
  }