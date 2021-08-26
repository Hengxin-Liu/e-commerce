import axios from "axios"
import { CARD_ADD_ITEM } from "../constants/cartConstant";

export const addToCart=(productId,qty)=>async(dispatch,getState)=>{
  const {data}=await axios.get(`/api/products/${productId}`);
   dispatch({
       type:CARD_ADD_ITEM,
       payload:{
           name:data.name,
           image:data.image,
           price:data.price,
           countInStock: data.countInStock,
           product:data._id,
           qty,
       },
   });
   localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems));
};