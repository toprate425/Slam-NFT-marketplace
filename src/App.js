import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./Pages/Login";
import Category from "./Pages/Category";
import Register from "./Pages/Register";
import Profile from "./Pages/Profile";
import BuyNFT from "./Pages/BuyNFT";
import Metavase from './Pages/Metavase'
import CreatePage from "./Pages/Create";
import CreateCollection from "./Pages/CreateCollection";
import { createBrowserHistory } from "history";
import Mint from './Pages/Mint'
import EditArt from "./Pages/EditArt";
import UpdateNFT from './Pages/UpdateNFT'
import Layout from "./Layout";
import auth from './auth/auth-helper';

const history = createBrowserHistory();

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    auth.isAuthenticated() ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

export default function App() {
  
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Layout>
          <PrivateRoute exact path="/profile" component={Profile} />
          <Route exact path="/category" component={Category} />
          <PrivateRoute exact path="/buy/:id" component={BuyNFT} />
          <PrivateRoute exact path="/mint/:id" component={Mint} />
          <PrivateRoute exact path="/edit/:id" component={EditArt} />
          <PrivateRoute exact path="/update/:id" component={UpdateNFT} />
          <Route exact path="/" component={Category} />
          <Route exact path="/metavase" component={Metavase} />
          <PrivateRoute exact path="/create" component={CreatePage} />
          <PrivateRoute exact path="/create/collection" component={CreateCollection}/>
        </Layout>
        <Redirect to='/login'/>
      </Switch>
    </Router>
  );
}
