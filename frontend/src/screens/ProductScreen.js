import React, { useEffect, useState } from 'react';
import Rating from '../component/Rating';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../component/LoadingBox';
import MessageBox from '../component/MessageBox';
import { detailsProduct } from '../actions/productAction';

export default function ProductScreen(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const [qty,setQty]=useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, [dispatch, productId]);

  const addToCartHandler=()=>{
    props.history.push(`/cart/${productId}?qty=${qty}`);
  }
  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="row top">
          <Link to="/" >Back to Result</Link>
          <div className="col-2">
            <img className="large" src={product.image} alt={product.name} />
          </div>
          <div className="col-1">
            <ul>
              <li>
                <h1>{product.name}</h1>
              </li>
              <li>
                <Rating
                  rating={product.rating}
                  numReviews={product.numReviews}
                />
              </li>
              <li>Price : ${product.price}</li>
              <li>
                Description:
                <p>{product.description}</p>
              </li>
            </ul>
          </div>
          <div className="col-1">
            <div className="card card-body">
              <ul>
                <li>
                    Seller{' '}
                    <h2>
                      <Link to={`/seller/${product.seller._id}`}>
                        {product.seller.seller.name}
                      </Link>
                    </h2>
                    <Rating
                      rating={product.seller.seller.rating}
                      numReviews={product.seller.seller.numReviews}
                    ></Rating>
                 </li>
                 <li>
                  <div className="row">
                    <div>Price</div>
                    <div className="price">${product.price}</div>
                  </div>
                 </li>
                 <li>
                  <div className="row">
                    <div>Status</div>
                    <div>
                      {product.countInStock > 0 ? (
                        <span className="success">In Stock</span>
                      ) : (
                        <span className="danger">Unavilable</span>
                      )}
                    </div>
                  </div>
                 </li>
                <li>
                {
                  product.countInStock > 0 && (
                    <>
                      <div className="row">
                        <div>Qty</div>
                        <div>
                          <select value={qty} onChange={e => setQty(e.target.value)} >
                            {
                              [...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option key={x+1} value={x + 1}>
                                    {x + 1}
                                    </option>
                                )
                              )
                            }
                          </select>
                        </div>
                      </div>
                      <li>
                        <button onClick={addToCartHandler}
                         className="primary block">Add to Cart</button>
                      </li>
                    </>
                  )}
                  </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}