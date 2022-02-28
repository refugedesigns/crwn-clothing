import React, { Component } from "react";
import "./App.css";
import Homepage from "./pages/homepage/Homepage";
import ShopePage from "./pages/shop/ShopePage";
import Header from "./components/header/Header";
import SigninAndSignup from "./pages/signin/SigninAndSignup";

import { auth } from "./firebase/firebase.config";

import { Routes, Route } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged( user => {
      this.setState({currentUser: user})

      console.log(user)
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }
  

  render() {
    return (
      <div className="App">
        <Header currentUser={this.state.currentUser} />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/shop" element={<ShopePage />} />
          <Route path="signin" element={<SigninAndSignup />} />
        </Routes>
      </div>
    );
  }
}

export default App;
