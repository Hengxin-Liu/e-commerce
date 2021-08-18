import * as ActionType from '../constants/productConstants';

export const productDetailsReducer = (state = { product: {}, loading: true }, action) => {
    switch (action.type) {
        case ActionType.PRODUCT_DETAILS_REQUEST:
            return { loading: true };
        case ActionType.PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload };
        case ActionType.PRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}