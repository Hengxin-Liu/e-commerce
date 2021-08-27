import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart ,removeFromCart} from '../actions/cartAction';
import MessageBox from './MessageBox';

export default function CartScreen(props) {
    const productId = props.match.params.id;
    const qty = props.location.search
        ? Number(props.location.search.split('=')[1])
        : 1;
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const dispatch = useDispatch();
    const removeFromCartHandler = (id) => {
     dispatch(removeFromCart(id))
    };

    const checkoutHandler = () => {
    props.history.push('/sign?redirect=shipping');
    };
   
    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch, productId, qty]);
    return (
        <div className="row top">
            <div className="col-2">
            <h1>Shopping Cart</h1>
                { 
                cartItems.length === 0 ? 
                <MessageBox> Cart is empty.<Link to="/">Go Shopping</Link></MessageBox>
                 :
                (
                <ul>
                {
                  cartItems.map((item) => (
                    <li key={item.product}>
                        <div className="row">
                          <div>
                             <img
                               src={item.image}
                               alt={item.name}
                               className="small" />
                          </div>
                          <div className="min-30">
                             <Link to={`/product/${item.product}`}>{item.name}</Link>
                          </div>
                          <div >
                          <select
                             value={item.qty}
                             onChange={(e) =>
                             dispatch(
                             addToCart(item.product,Number(e.target.value))
                            )}>
                                {
                                  /*return number from 1 to contInStock */
                               [...Array(item.countInStock).keys()].map(
                                (x) => (
                                 <option key={x + 1} value={x + 1}>
                                     {x + 1}
                                 </option>
                                ))}
                             </select>
                            </div>
                            <div>${item.price}</div>
                            <div>
                            <button
                               type="button"
                               onClick={()=>removeFromCartHandler(item.product)}
                             >Dellete</button>
                            </div>              
                        </div>
                    </li>
                   ))}
                 </ul>
                )} 
            </div>
            <div className="col-1">
                <div className="card card-body">
                   <ul>
                     <li>
                      <h2>
                      Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : $
                      {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                      </h2>
                     </li>
                     <li>
                         <button
                         type="button" 
                         onClick={checkoutHandler} 
                         className="primary block"
                         disabled={cartItems.length === 0}>
                         Proceed to Checkout
                         </button>
                     </li>
                   </ul>
                </div>
            </div>
        </div>
    );
}