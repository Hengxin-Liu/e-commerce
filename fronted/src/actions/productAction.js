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