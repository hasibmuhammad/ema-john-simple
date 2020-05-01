import React from 'react';
import './Review.css';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import { useEffect } from 'react';
import fakeData from '../../fakeData';
import { useState } from 'react';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif';
import { Link } from 'react-router-dom';
import { useAuth } from '../Login/useAuth';

const Review = () => {

    const auth = useAuth();
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlace] = useState(false);

    const handlePlaceOrder = () => {
        setCart([]);
        setOrderPlace(true);
        processOrder();
    }

    const removeProduct = ( key ) => {
        console.log( key );
        const newCart = cart.filter( pd => pd.key !== key );
        setCart( newCart );
        removeFromDatabaseCart(key);
    }

    useEffect( () => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys( savedCart );
        const cartProducts = productKeys.map( key => {
            const product = fakeData.find( pd => pd.key === key );
            product.quantity = savedCart[key]; 
            return product;
        } );
        setCart( cartProducts );
    }, [] );

    const thankYou = ( orderPlaced ) ? <img src={happyImage} alt=""/> : '';

    return (
        <div className="twin-container">
            <div className="products-container">
                { cart.map( product => <ReviewItem removeProduct={removeProduct} key={product.key} product={product}></ReviewItem> ) }
                { thankYou }
                {
                    !cart.length && 
                    <h1>Your cart is empty! <a href="/">Continue Shopping...</a> </h1>
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to={auth.user ? '/shipment' : '/login'}>
                        {
                            auth.user ?
                            <button className="cart-btn">Proceed Checkout</button>
                            :
                            <button className="cart-btn">Login to Proceed</button>
                        }
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Review;