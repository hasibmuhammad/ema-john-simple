import React from 'react';
import './Cart.css';

const Cart = (props) => {
    const cart = props.cart;
    const total = cart.reduce( (total, product) => total + product.price, 0 );
    let shipping = 0;
    if( total > 15 ) {
        shipping = 4.99;
    }
    else if( total > 35 ) {
        shipping = 0;
    }
    const tax = total / 10;
    const grandTotal = (total + shipping + tax).toFixed(2);
    return (
        <div>
            <h4>Order Summary</h4>
            <p>Items Ordered: {cart.length} </p>
            <p><small>Shipping & Handling: {shipping.toFixed(2)} </small></p>
            <p><small>Product price: ${total.toFixed(2)} </small></p>
            <p><small>Tax + VAT: {tax.toFixed(2)} </small></p>
            <p>Total Price: ${grandTotal} </p>
        </div>
    );
};

export default Cart;