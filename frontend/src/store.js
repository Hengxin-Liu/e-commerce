import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './reducer/cartReducers';
import { orderCreateReducer, orderDeleteReducer, orderDeliverReducer, orderDetaisReducer, orderListReducer, orderMineListReducer, orderPayReducer } from './reducer/orderReducer';
import { productCategoryListReducer, productCreateReducer, productDeleteReducer, productDetailsReducer, productUpdateReducer } from './reducer/productReducer';
import {productListReducer} from './reducer/productReducers'
import { userUpdateProfileReducer, userDetailsReducer, userRegisterReducer, userSigninReducer, userListReducer, userDeleteReducer, userUpdateReducer, userTopSellerListReducer} from './reducer/userReducer';

const initialState = {
    userSignin: {
      userInfo:localStorage.getItem('userInfo') 
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null,
    },
    cart:{
      cartItems:localStorage.getItem('cartItems') 
        ? JSON.parse(localStorage.getItem('cartItems'))
        : [],
      shippingAddress:localStorage.getItem('shippingAddress')
        ?  JSON.parse(localStorage.getItem('shippingAddress'))
        : {},
      paymentMethod:'PayPal',
    },
};
const reducer=combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetaisReducer,
    orderPay: orderPayReducer,
    orderMineList: orderMineListReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productDelete: productDeleteReducer,
    orderList: orderListReducer,
    orderDelete: orderDeleteReducer,
    orderDeliver: orderDeliverReducer,
    userList: userListReducer,
    userUpdate: userUpdateReducer,
    userDelete: userDeleteReducer,
    userTopSellersList: userTopSellerListReducer,
    productCategoryList: productCategoryListReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer, 
    initialState, 
    composeEnhancer(applyMiddleware(thunk))
    );

export default store;