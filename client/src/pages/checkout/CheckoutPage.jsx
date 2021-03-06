import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import CheckoutItem from "../../components/checkout-item/CheckoutItem";
import StripeCheckoutButton from "../../components/stripe-button/StripeButton";

import {
  selectCartItems,
  selectCartTotal,
} from "../../redux/cart/cart.selectors";

import "./checkout.styles.scss";

const CheckoutPage = ({ cartItems, total }) => {
  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      {cartItems.length ? (
        cartItems.map((item) => <CheckoutItem key={item.id} cartItem={item} />)
      ) : (
        <span className="empty-cart"> Your cart is empty </span>
      )}
      <div className="total"> ${total} </div>
      <div className="test-warning">
        *Please use the following test credit card for payments <br /> 4242 4242
        4242 4242 - Exp: 12/30 - CVV: 123
      </div>
      { total > 0 && <StripeCheckoutButton price={total} />}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
});

export default connect(mapStateToProps)(CheckoutPage);
