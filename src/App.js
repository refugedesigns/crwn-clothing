import React, { Component } from "react";
import "./App.css";
import Homepage from "./pages/homepage/Homepage";
import ShopePage from "./pages/shop/ShopePage";
import Header from "./components/header/Header";
import SigninAndSignup from "./pages/signinAndSignup/SigninAndSignup";

import { auth, createUserProfileDocument } from "./firebase/firebase.config";

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
    this.unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth => {
      if(userAuth) {
       const userRef = await createUserProfileDocument(userAuth);

       userRef.onSnapshot(snapShot => {
         this.setState({
          currentUser: { id: snapShot.id,
           ...snapShot.data()
         }})
       })
      }
      // Set user to null on signout
      this.setState({currentUser: userAuth})
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
