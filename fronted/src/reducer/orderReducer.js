import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_RESTE, ORDER_CREATE_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS } from "../constants/orderConstant";

export const orderCreateReducer = (state={}, action) =>{
   switch(action.type){
     case ORDER_CREATE_REQUEST :
         return {loading: true};
     case ORDER_CREATE_SUCCESS :
         return {loading: false, success: true, order: action.payload};
     case ORDER_CREATE_FAIL :
         return {loading: false, error: action.payload};
     case ORDER_CREATE_RESTE :
         return {};   
      default :
         return state;
   }
};

export const orderDetaisReducer = (state ={loading: true, order: {}},action) => {
  switch(action.type){
    case ORDER_DETAILS_REQUEST :
        return {loading: true};
    case ORDER_DETAILS_SUCCESS :
        return {loading: false, order: action.payload};
    case ORDER_DETAILS_FAIL :
        return {loading: false, error: action.payload};
    default :
    return state;
  }
}