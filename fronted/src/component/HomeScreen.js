import React, { useEffect } from 'react';
import Product from '../component//Product';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productAction';


export default function HomeScreen(props) {
   const dispatch=useDispatch();
   const productList=useSelector((state)=>state.productList);
   const {loading ,error,products}=productList;
       useEffect(() => {
           dispatch(listProducts());
    }, []);
    return (
        <div>
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <div className="row center">
                    {products.map(product => (
                        <Product key={product._id} product={product} />
                    ))}
                </div>
            )}
        </div>
    )
}