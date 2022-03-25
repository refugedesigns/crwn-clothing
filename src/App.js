import React, { Component } from "react";

import { connect } from "react-redux";


import Homepage from "./pages/homepage/Homepage";
import ShopePage from "./pages/shop/ShopePage";
import Header from "./components/header/Header";
import SigninAndSignup from "./pages/signinAndSignup/SigninAndSignup";
import CheckoutPage from "./pages/checkout/CheckoutPage";


import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "./redux/user/user.selector";
import { checkUserSection } from "./redux/user/user.actions";

class App extends Component {

  componentDidMount() {
    const { checkUserSection } = this.props
    checkUserSection()
  }


  render() {
    return (
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/shop/*" element={<ShopePage />} />
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
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  checkUserSection: () => dispatch(checkUserSection())
})

export default connect(mapStateToProps,mapDispatchToProps)(App);
