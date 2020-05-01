import React from 'react';
import './Login.css';
import Auth from './useAuth';

const Login = () => {

    const auth = Auth();

    const handleSignIn = () => {
        auth.signInWithGoogle()
        .then( res => {
            window.location.pathname = '/review'
        } )
    }

    const handleSignOut = () => {
        auth.signOut()
        .then(res => {
            console.log( "Logged out ...." )
        })
    }

    return (
        <div>
            <h3>Login in Component</h3>
            {
                auth.user ? <button onClick={handleSignOut}>Sign out</button> : <button onClick={handleSignIn}>Sign in</button>
            }
        </div>
    );
};

export default Login;