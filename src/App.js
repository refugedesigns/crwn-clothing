import React, { Component } from "react";
import "./App.css";

import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user.actions";

import Homepage from "./pages/homepage/Homepage";
import ShopePage from "./pages/shop/ShopePage";
import Header from "./components/header/Header";
import SigninAndSignup from "./pages/signinAndSignup/SigninAndSignup";

import { auth, createUserProfileDocument } from "./firebase/firebase.config";

import { Routes, Route, Navigate } from "react-router-dom";

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
            path="signin"
            element={
              this.props.currentUser ? <Navigate to="/" /> : <SigninAndSignup />
            }
          />
        </Routes>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
