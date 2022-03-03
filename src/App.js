import React, { Component } from "react";
import "./App.css";

import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user.actions";

import Homepage from "./pages/homepage/Homepage";
import ShopePage from "./pages/shop/ShopePage";
import Header from "./components/header/Header";
import SigninAndSignup from "./pages/signinAndSignup/SigninAndSignup";

import { auth, createUserProfileDocument } from "./firebase/firebase.config";

import { Routes, Route } from "react-router-dom";

class App extends Component { 

  unsubscribeFromAuth = null

  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth => {
      if(userAuth) {
       const userRef = await createUserProfileDocument(userAuth);

       userRef.onSnapshot(snapShot => {
         setCurrentUser({
          currentUser: { id: snapShot.id,
           ...snapShot.data()
         }})
       })
      }
      // Set user to null on signout
      setCurrentUser({currentUser: userAuth})
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }
  

  render() {
    return (
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/shop" element={<ShopePage />} />
          <Route path="signin" element={<SigninAndSignup />} />
        </Routes>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(null, mapDispatchToProps)(App);
