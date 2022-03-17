import React from "react";
import { connect } from "react-redux";

import StripeCheckout from "react-stripe-checkout";
import { resetCart } from "../../redux/cart/cart.actions";

const StripeCheckoutButton = ({ price, resetCart }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51J7HEFEGeVpld5Y13uVrav0Ymx0xK8btMw498Mk43vJxLPVT2b9506rubzybVezLw1WdPGWncsp8gxTduU6uulOg00N8YvEdbQ";
  const onToken = (token) => {
    resetCart();
    alert("Payment successful");
  };
  return (
    <StripeCheckout
      label="Pay Now"
      name="CRWN Clothing Ltd."
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

const mapDispatchToProps = (dispatch) => ({
  resetCart: () => dispatch(resetCart()),
});

export default connect(null, mapDispatchToProps)(StripeCheckoutButton);
