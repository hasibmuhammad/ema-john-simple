import React from 'react';
import './ProductDetail.css';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';
const ProductDetail = () => {
    const {ID} = useParams();
    const product = fakeData.find( product => product.key === ID );
    return (
        <div>
            <h1> {ID} Product detail coming sooon.....</h1>
            <Product addToCartBtn={false} product={product}></Product>
        </div>
    );
};

export default ProductDetail;