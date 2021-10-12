import React, { useEffect } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import Product from '../component/Product';
import LoadingBox from '../component/LoadingBox';
import MessageBox from '../component/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productAction';
import { Link } from 'react-router-dom';
import { listTopSellers } from '../actions/userAction';


export default function HomeScreen(props) {
   const dispatch=useDispatch();
   const productList=useSelector((state)=>state.productList);
   const {loading ,error,products}=productList;
   const userTopSellersList = useSelector((state) => state.userTopSellersList)
   const { loading: loadingSellers,
    error: errorSellers,
    users: sellers,
   } = userTopSellersList;

   useEffect(() => {
     dispatch(listProducts({}));
     dispatch(listTopSellers());
    },[dispatch]);
    return (
        <div>
            <h2>Top Sellers</h2>
            {loadingSellers ? (
              <LoadingBox></LoadingBox>  
            ) : errorSellers ? (
              <MessageBox variant="danger">{errorSellers}</MessageBox>
            ) : (
              <>
              {sellers.length === 0 && <MessageBox>No Seller Found</MessageBox>}
              <Carousel showArrows autoPlay showThumbs={false} >
                {sellers.map((seller) => (
                  <div key={seller._id}>
                    <Link to={`/seller/${seller._id}`} >
                     <img src={seller.seller.logo} alt={seller.seller.name}/>
                     <p className="legend">{seller.seller.name}</p>
                    </Link>
                  </div>
                ))}
              </Carousel>
              </> 
            )}
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
             <>
               {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
                 <div className="row center">
                  {products.map((product) => (
                    <Product key={product._id} product={product}></Product>
                  ))}
                 </div>
              </>
            )}
        </div>
    );
}