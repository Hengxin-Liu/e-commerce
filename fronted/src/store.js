import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { productDetailsReducer } from './reducer/productReducer';
import {productListReducer} from './reducer/productReducers'

const initialState = {};
const reducer=combineReducers({
    productList : productListReducer,
    productDetails:productDetailsReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer, 
    initialState, 
    composeEnhancer(applyMiddleware(thunk))
    );

export default store;