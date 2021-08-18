import React, { useEffect } from 'react';
import Rating from './Rating';
import {Link} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';
import { detailsProduct } from '../actions/productAction';

export default function ProductScreen(props) {
  const dispatch=useDispatch();
  const productId=props.match.params.id;
  const productDetails=useSelector((state)=>state.productDetails);
  const { loading,error,product}=productDetails;
 
  useEffect(()=>{
    dispatch(detailsProduct(productId));
  },[dispatch,productId]);
  return (
    <div>
    {loading ? (
        <LoadingBox></LoadingBox>
    ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
    ) : (
      <div className="row top">
      <Link to="/" className="card-body">Back to Result</Link>
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
              <button className="primary block">Add to Cart</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
    )}
</div>
  )
}