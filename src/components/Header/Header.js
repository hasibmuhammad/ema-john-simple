import React, { useState } from 'react';
import logo from '../../images/logo.png';
import './Header.css';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useAuth } from '../Login/useAuth';
import { Link } from 'react-router-dom';

// const usePrevious = value => {
//     const prev = useRef()
//     useEffect( () => {
//         prev.current = value;
//     }, [value] )
//     return prev.current;
// }

const Header = () => {
    const auth = useAuth();
    // const [count, setCount] = useState(0);
    // const previous = usePrevious(count);
    return (
        <div className="Header">
            {/* <button onClick={ () => setCount( count - 1 ) }>-</button>
            <button onClick={ () => setCount( count + 1 ) }>+</button>
            <h3> count :  {count}  Previous : {previous} </h3> */}

            <img src={logo} alt=""/>
            <nav>
                <a href="/shop">Shop</a>
                <a href="/review">Order Review</a>
                <a href="/inventory">Manage Inventory here</a>
                {
                    auth.user ?
                    <span style={{color: 'yellow'}}> {auth.user.displayName}</span>
                    : 
                    <Link to="/login">
                        <span style={{color: 'yellow'}}>Sign in</span>
                    </Link>
                }
                {
                    auth.user && <a href='/login'>Sign out</a>
                }
            </nav>
        </div>
    );
};

export default Header;