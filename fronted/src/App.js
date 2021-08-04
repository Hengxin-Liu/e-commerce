import React from 'react';
import data from './data';
import '../node_modules/font-awesome/css/font-awesome.min.css'; 
import Product from './component/Product';


function App() {
  return (
    <div className="grid-container">
    <header className="row">
        <div>  
        <a href="/"  className="brand">amazona</a>
        </div>
         <div>
         <a href="/cart">Cart</a>
         <a href="/sigin">Sign In</a>
         </div>
     </header>
     <main>
         <div>
         <div className="row center">
         {data.products.map(product =>(
          <Product key ={product._id} product={product} />
        ))}
      </div>
     </div>
</main>
    <footer className="row center"> All right reserved</footer>
 </div>
  );
}

export default App;
