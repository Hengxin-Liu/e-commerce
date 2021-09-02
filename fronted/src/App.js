import React from 'react';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import ProductScreen from './component/ProductScreen.js';
import HomeScreen from './component/HomeScreen.js';
import CartScreen from './component/CartScreen.js';
import { useSelector } from 'react-redux';
import SigninScreen from './component/SigninScreen.js';

function App() {

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

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
                        <Link to="/signin">Sign In</Link>
                    </div>
                </header>
                <main>
                    <Route path="/cart/:id?" component={CartScreen} />
                    <Route path="/product/:id" component={ProductScreen} />
                    <Route path="/" component={HomeScreen} exact />
                    <Route path="/signin" component={SigninScreen}/>
                </main>
                <footer className="row center"> All right reserved</footer>
            </div>
        </BrowserRouter>
    );
}

export default App;
