import React from 'react';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import ProductScreen from './component/ProductScreen';
import HomeScreen from './component/HomeScreen';


function App() {
    return (
        <BrowserRouter>
            <div className="grid-container">
                <header className="row">
                    <div>
                        <Link to="/" className="brand">amazona</Link>
                    </div>
                    <div>
                        <Link to="/cart">Cart</Link>
                        <Link to="/sigin">Sign In</Link>
                    </div>
                </header>
                <main>
                    <Route path="/product/:id" component={ProductScreen} />
                    <Route path="/" component={HomeScreen} exact />

                </main>
                <footer className="row center"> All right reserved</footer>
            </div>
        </BrowserRouter>
    );
}

export default App;
