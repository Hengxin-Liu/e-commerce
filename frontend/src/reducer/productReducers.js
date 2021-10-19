import * as ActionType from "../constants/productConstants";

export const productListReducer = (state={loading:true,products:[]}, action) => {
    switch (action.type) {
        case ActionType.PRODUCT_LIST_REQUEST:
            return { loading: true };
        case ActionType.PRODUCT_LIST_SUCCESS:
            return { 
                loading: false, 
                products: action.payload.products,
                pages: action.payload.pages,
                page: action.payload.page };
        case ActionType.PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};