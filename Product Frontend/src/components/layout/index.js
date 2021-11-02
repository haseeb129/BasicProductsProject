import React, { Component } from "react";
import "../../App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import AddProduct from "../pages/addProduct";
import ProductList from "../pages/productList";
import Register from "../pages/auth/register";
import SignIn from "../pages/auth/signIn";
import ProductView from "../pages/productView";
import auth from "../pages/auth/authService";
class Layout extends Component {
  state = {
    currentUser: auth.getCurrentUser(),
  };
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <div className="mb-4 appClass">
            <Navbar />
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => {
                  return <ProductList {...props} {...this.props} />;
                }}
              />
              <Route
                exact
                path="/ProductView"
                render={(props) => {
                  return <ProductView {...props} />;
                }}
              />

              <Route
                exact
                path="/AddProduct"
                render={(props) => {
                  if (!this.state.currentUser) return <Redirect to="/" />;
                  return <AddProduct {...props} {...this.props} />;
                }}
              />
              <Route
                exact
                path="/SignUp"
                render={(props) => {
                  if (this.state.currentUser) return <Redirect to="/" />;
                  return <Register {...props} {...this.props} />;
                }}
              />
              <Route
                exact
                path="/SignIn"
                render={(props) => {
                  if (this.state.currentUser) return <Redirect to="/" />;
                  return <SignIn {...props} {...this.props} />;
                }}
              />
            </Switch>
          </div>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default Layout;
