import axios from "axios";
import Axios from "axios";
import * as  ActionType from "../constants/productConstants"


export const listProducts = () => async (dispatch) => {
    dispatch({
        type: ActionType.PRODUCT_LIST_REQUEST
    });
    try {
        const { data } = await Axios.get('api/products');
        dispatch({ type: ActionType.PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: ActionType.PRODUCT_LIST_FAIL, payload: error.message })
    }
};

export const detailsProduct = (productId) => async (dispatch) => {
    dispatch({
        type: ActionType.PRODUCT_DETAILS_REQUEST, payload: productId
    });
    try {
        const { data } = await Axios.get(`/api/products/${productId}`);
        dispatch({ type: ActionType.PRODUCT_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: ActionType.PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
};

export const createProduct = () => async(dispatch,getState) => {
  dispatch({type: ActionType.PRODUCT_CREATE_REQUEST});
  try{
   const {userSignin: {userInfo}} = getState();
   const {data} = await axios.post('/api/products',{},
    {
        headers: {Authorization: `Bearer ${userInfo.token}`}
    });
    dispatch({type: ActionType.PRODUCT_CREATE_SUCCESS,payload: data.product});
  }catch(error){
    dispatch({
       type: ActionType.PRODUCT_CREATE_FAIL,
       payload: error.response && error.response.data.message
         ? error.response.data.message
         : error.message
     })
  }
};
