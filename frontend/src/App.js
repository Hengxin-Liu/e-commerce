import React from 'react';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import ProductScreen from './screens/ProductScreen.js';
import HomeScreen from './screens/HomeScreen.js';
import CartScreen from './screens/CartScreen.js';
import { useDispatch, useSelector } from 'react-redux';
import SigninScreen from './screens/SigninScreen.js';
import { signout } from './actions/userAction';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import PrivateRoute from './component/PrivateRoute';
import ProductListScreen from './screens/ProductListScreen';
import AdminRoute from './component/AdminRoute';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';

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
                  {
                   cartItems.length > 0 && (
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
                          <li>
                            <Link to="/profile">User Profile</Link> 
                          </li>
                          <li>
                            <Link to="/orderhistory">Order History</Link>
                          </li>
                          <li>
                            <Link to="#signout" onClick={signoutHandler}>
                                Sign out
                            </Link>
                          </li>
                        </ul>
                      </div>
                    ) : (
                        <Link to="/signin">Sign In</Link> 
                    )}   
                    {
                       userInfo && userInfo.isAdmin && (
                         <div className="dropdown">
                            <Link to="#admin">
                               Admin{' '}<i className="fa fa-caret-down"></i>
                            </Link>
                            <ul className="dropdown-content">
                             <li>
                               <Link to="/dashboard">Dashboard</Link>
                             </li>
                             <li>
                               <Link to="/productlist">Products</Link>
                             </li>
                             <li>
                               <Link to="/orderlist">Orders</Link>
                             </li>
                             <li>
                               <Link to="/userlist">Users</Link>
                             </li>
                            </ul>
                         </div>
                            )
                    }
                 </div>
            </header>
            <main>
             <Route path="/" component={HomeScreen} exact />
             <Route path="/cart/:id?" component={CartScreen} />
             <Route path="/product/:id" component={ProductScreen} exact/>
             <Route path="/product/:id/edit" component={ProductEditScreen} exact/>
             <Route path="/signin" component={SigninScreen}/>
             <Route path="/register" component={RegisterScreen}/>
             <Route path="/shipping" component={ShippingAddressScreen}/>
             <Route path="/payment" component={PaymentScreen}/>
             <Route path="/placeorder" component={PlaceOrderScreen}/>
             <Route path="/order/:id" component={OrderScreen}/>
             <Route path="/orderhistory" component={OrderHistoryScreen}/>
             <PrivateRoute path="/profile" component={ProfileScreen}/> 
             <AdminRoute path="/productlist" component={ProductListScreen}/>
             <AdminRoute path="/orderList" component={OrderListScreen}/>
             <AdminRoute path="/userList" component={UserListScreen} />
             <AdminRoute path="/user/:id/edit" component={UserEditScreen}/>
            </main>
            <footer className="row center"> All right reserved</footer>
        </div>
 </BrowserRouter>
    );
}

export default App;
