import React, { createContext } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebase.config";
import { useState } from "react";
import { useContext } from 'react';
import { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';

firebase.initializeApp( firebaseConfig );

const AuthContext = createContext();

export const AuthContextProvider = (props) => {
    return <AuthContext.Provider value={Auth()}>{props.children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext);

export const PrivateRoute = ({ children, ...rest }) => {
    const auth = useAuth();
    return (
        <Route
            {...rest}
            render = {
                ( {location} ) => 
                    auth.user ? (
                        children
                    ) : (
                        <Redirect
                            to={{
                                pathname: '/login',
                                state: {from: location}
                            }}
                        />
                    )
            }
        />
    );
  }  

const getUser = user => {
    const {displayName, email, photoURL} = user;
    return {displayName, email, photoURL};
}

const Auth = () => {
    const [user, setUser] = useState(null);
    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        return firebase.auth().signInWithPopup( provider )
        .then( res => {
            const signedInUser = getUser( res.user );
            setUser( signedInUser );
            return res.user;
        } )
        .catch( err => {
            console.log( err );
            setUser( null );
            return err.message;
        } )
    }

    const signOut = () => {
        return firebase.auth().signOut()
        .then( res => {
            setUser( null );
        } )
    }

    useEffect( () => {
        firebase.auth().onAuthStateChanged( user => {
            if( user ) {
                setUser( getUser( user ) )
            } else {
                
            }
        } )
    }, [] )

    return {
        signInWithGoogle,
        signOut,
        user
    }
}
export default Auth;