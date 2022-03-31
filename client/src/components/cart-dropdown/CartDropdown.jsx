import React from "react";

import { connect } from "react-redux";

import { useNavigate } from "react-router-dom";

import "./cart-dropdown.styles.scss";

import CustomButton from "../ui-components/custom-button/CustomButton";
import { selectCartItems } from "../../redux/cart/cart.selectors";
import { toggleCartDropdown } from "../../redux/cart/cart.actions";
import CartItem from "../cart-item/CartItem";

const CartDropdown = ({ cartItems, dispatch }) => {
  const navigate = useNavigate();
  return (
    <div className="cart-dropdown">
      <div className={`${!cartItems.length && "empty-cart"} cart-items`}>
        {cartItems.length ? (
          cartItems?.map(({ id, ...otherProps }) => (
            <CartItem key={id} {...otherProps} />
          ))
        ) : (
          <span className="empty-message"> Your cart is empty </span>
        )}
      </div>
      <CustomButton
        onClick={() => {
          navigate("/checkout");
          dispatch(toggleCartDropdown());
        }}
      >
        {" "}
        GO TO CHECKOUT{" "}
      </CustomButton>
    </div>
  );
};

const mapStateToProps = (state) => ({
  cartItems: selectCartItems(state),
});

export default connect(mapStateToProps)(CartDropdown);
