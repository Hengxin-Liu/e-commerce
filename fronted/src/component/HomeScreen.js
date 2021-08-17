import React, { useEffect } from 'react';
import Product from '../component//Product';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productAction';


export default function HomeScreen(props) {
   /* const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
   const [error, setError] = useState(false);*/
   const dispatch=useDispatch();
   const productList=useSelector((state)=>state.productList);
   const {loading ,error,products}=productList;
       useEffect(() => {
           dispatch(listProducts());
       /* const fecthData = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get('api/products');
                setLoading(false);
                setProducts(data);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fecthData();*/
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