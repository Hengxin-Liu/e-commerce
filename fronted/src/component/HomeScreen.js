import React from 'react';
import Product from '../component//Product';
import data from '../data';

export default function HomeScreen(props) {
    return (
        <div>
            <div className="row center">
                {data.products.map(product => (
                    <Product key={product._id} product={product} />
                ))}
            </div>
        </div>
    )
}