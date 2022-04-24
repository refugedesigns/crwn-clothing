import React, { Component, lazy, Suspense } from "react";

import { connect } from "react-redux";

import Header from "./components/header/Header";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "./redux/user/user.selector";
import { checkUserSection } from "./redux/user/user.actions";
import Spinner from "./components/spinner/spinner.component";
import ErrorBoundary from "./components/error-boundary/error-boundary.component";

const Homepage = lazy(() => import("./pages/homepage/Homepage"));
const ShopePage = lazy(() => import("./pages/shop/ShopePage"));
const SigninAndSignup = lazy(() =>
  import("./pages/signinAndSignup/SigninAndSignup")
);
const CheckoutPage = lazy(() => import("./pages/checkout/CheckoutPage"));

class App extends Component {
  componentDidMount() {
    const { checkUserSection } = this.props;
    checkUserSection();
  }

  render() {
    return (
      <div>
        <Header />
        <ErrorBoundary>
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/shop/*" element={<ShopePage />} />
              <Route
                path="/signin"
                element={
                  this.props.currentUser ? (
                    <Navigate to="/" />
                  ) : (
                    <SigninAndSignup />
                  )
                }
              />
              <Route path="/checkout" element={<CheckoutPage />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  checkUserSection: () => dispatch(checkUserSection()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
