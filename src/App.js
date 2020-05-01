import React from 'react';
import './App.css';
import Shop from './components/Shop/Shop';
import Header from './components/Header/Header';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import Nomatch from './components/Nomatch/Nomatch';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Login from './components/Login/Login';
import { AuthContextProvider, PrivateRoute } from './components/Login/useAuth';
import Shipment from './components/Shipment/Shipment';

function App() {
  return (
    <div>
        <AuthContextProvider>
          <Router>
            <Header></Header>
            <Switch>
              <Route path="/shop">
                <Shop></Shop>
              </Route>
              <Route path="/review">
                <Review></Review>
              </Route>
              <Route path="/inventory">
                <Inventory></Inventory>
              </Route>
              <Route path="/login">
                <Login/>
              </Route>
              <Route exact={true} path="/">
                <Shop></Shop>
              </Route>
              <Route path="/product/:ID">
                <ProductDetail></ProductDetail>
              </Route>
              <PrivateRoute path="/shipment">
                <Shipment></Shipment>
              </PrivateRoute>
              <Route path="*">
                <Nomatch></Nomatch>
              </Route>
            </Switch>
          </Router>
        </AuthContextProvider>
    </div>
  );

}

export default App;
