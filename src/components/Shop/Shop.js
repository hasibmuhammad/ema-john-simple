import React, { useState, useEffect } from 'react';
import fakeData from '../../fakeData';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';

const Shop = () => {
    const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState(first10);
    const [cart, setCart] = useState([]);

    useEffect( () => {
        const savedProduct = getDatabaseCart();
        const productKeys = Object.keys( savedProduct );
        const previousCart = productKeys.map( key => {
            const product = fakeData.find( pd => pd.key === key );
            product.quantity = savedProduct[key];
            return product;
        } )
        setCart( previousCart );
    }, [] )
    
    const handleAddProduct = ( product ) => {
        let count = 1;
        let newCart;
        const sameProduct = cart.find(pd => pd.key === product.key);
        if( sameProduct ) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter( pd => pd.key !== product.key );
            newCart = [...others, sameProduct];
        }
        else {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);
        addToDatabaseCart(product.key, count);
    }

    return (
        <div className="twin-container">
            <div className="products-container">
                {
                    products.map( product => <Product key={product.key} addToCartBtn={true} product={product} handleAddProduct={handleAddProduct}></Product> )
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to={"/review"}><button className="cart-btn">Review Order</button></Link>
                </Cart>                                                                                                                                                                                                                                                      
            </div>
        </div>
    );
};

export default Shop;