import React, { Component } from "react";
import { createStructuredSelector } from "reselect";

import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selector";

import Homepage from "./pages/homepage/Homepage";
import ShopePage from "./pages/shop/ShopePage";
import Header from "./components/header/Header";
import SigninAndSignup from "./pages/signinAndSignup/SigninAndSignup";
import CheckoutPage from "./pages/checkout/CheckoutPage";

import { auth, createUserProfileDocument } from "./firebase/firebase.config";

import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
class App extends Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      }
      // Set user to null on signout
      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/shop" element={<ShopePage />} />
          <Route
            path="/signin"
            element={
              this.props.currentUser ? <Navigate to="/" /> : <SigninAndSignup />
            }
          />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
