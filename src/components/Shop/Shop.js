import React, { useState } from 'react';
import fakeData from '../../fakeData';
import './Shop.css';
import Product from '../Product/Product';

const Shop = () => {
    const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState(first10);
    return (
        <div className="shop-container">
            <div className="products-container">
                <ul>
                    {
                        products.map( product => <Product> {product.name} </Product> )
                    }
                </ul>
            </div>
            <div className="cart-container">
                <h3>This is cart component</h3>
            </div>
        </div>
    );
};

export default Shop;