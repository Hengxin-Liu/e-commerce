import React from 'react';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import ProductScreen from './component/ProductScreen.js';
import HomeScreen from './component/HomeScreen.js';
import CartScreen from './component/CartScreen.js';
import { useDispatch, useSelector } from 'react-redux';
import SigninScreen from './component/SigninScreen.js';
import { signout } from './actions/userAction';
import RegisterScreen from './component/RegisterScreen';
import ShippingAddressScreen from './component/ShippingAddressScreen';
import PaymentScreen from './component/PaymentScreen';
import PlaceOrderScreen from './component/PlaceOrderScreen';

function App() {

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    const userSignin = useSelector((state) => state.userSignin);
    const {userInfo} = userSignin;
    const dispatch = useDispatch();

    const signoutHandler = () =>{
        dispatch(signout());
    }
    return (
        <BrowserRouter>
            <div className="grid-container">
                <header className="row">
                    <div>
                        <Link to="/" className="brand">amazona</Link>
                    </div>
                    <div>
                        <Link to="/cart">
                        Cart
                        {cartItems.length > 0 && (
                            <span className="badge">{cartItems.length}</span>
                        )}
                        </Link>
                        {
                            userInfo ? (
                                <div className="dropdown">
                                <Link to="#">{userInfo.name}
                                <i className="fa fa-caret-down"></i>
                                </Link>
                                <ul className="dropdown-content">
                                 <Link to="#signout" onClick={signoutHandler}>
                                     Sign out
                                 </Link>
                                </ul>
                                </div>
                            ) :
                            (
                               <Link to="/signin">Sign In</Link> 
                            )}                        
                    </div>
                </header>
                <main>
                    <Route path="/cart/:id?" component={CartScreen} />
                    <Route path="/product/:id" component={ProductScreen} />
                    <Route path="/" component={HomeScreen} exact />
                    <Route path="/signin" component={SigninScreen}/>
                    <Route path="/register" component={RegisterScreen}/>
                    <Route path="/shipping" component={ShippingAddressScreen}/>
                    <Route path="/payment" component={PaymentScreen}/>
                    <Route path="/placeorder" component={PlaceOrderScreen}/>
                </main>
                <footer className="row center"> All right reserved</footer>
            </div>
        </BrowserRouter>
    );
}

export default App;
