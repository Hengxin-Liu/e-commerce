import {
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_RESET,
} from '../constants/productConstants';

export const productDetailsReducer = (state = {loading: true }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { loading: true };
        case PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload };
        case PRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const productCreateReducer = (state={}, action) => {
  switch(action.type){
    case PRODUCT_CREATE_REQUEST:
        return {loading: true};
    case PRODUCT_CREATE_SUCCESS:
        return {loading: false, success: true, product: action.payload};
    case PRODUCT_CREATE_FAIL:
        return {loading:false, error: action.payload};
    case PRODUCT_CREATE_RESET:
        return { };
    default:
       return  state;
  }
};