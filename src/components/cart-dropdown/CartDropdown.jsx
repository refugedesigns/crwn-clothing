import React from 'react'

import { connect } from 'react-redux'

import "./cart-dropdown.styles.scss"

import CustomButton from "../ui-components/custom-button/CustomButton"
import { selectCartItems } from '../../redux/cart/cart.selectors';
import CartItem from '../cart-item/CartItem';

const CartDropdown = ({cartItems}) => {
  return (
    <div className="cart-dropdown">
      <div className="cart-items">
        {
          cartItems?.map(({id, ...otherProps}) => (
            <CartItem key={id} {...otherProps} />
          ))
        }
      </div>
      <CustomButton> GO TO CHECKOUT </CustomButton>
    </div>
  );
}

const mapStateToProps = (state) => ({
  cartItems: selectCartItems(state)
})

export default connect(mapStateToProps)(CartDropdown)