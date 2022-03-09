import React from 'react'
import { connect } from 'react-redux'
import { addItemToCart, decreaseItemQuantity, removeCartItem } from '../../redux/cart/cart.actions';

import "./checkout-item.styles.scss"

const CheckoutItem = ({cartItem, removeItem, addItem, decreaseItemQuantity}) => {
  const {name, imageUrl, price, quantity, id} = cartItem
  return (
    <div className="checkout-item">
      <div className="image-container">
        <img src={imageUrl} alt="item" />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={() => decreaseItemQuantity(cartItem)}>&#10094;</div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={() => addItem(cartItem)}>
          &#10095;
        </div>
      </span>
      <span className="price">{price}</span>
      <div className="remove-button" onClick={() => removeItem(id)}>
        &#10005;
      </div>
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  removeItem: (id) => dispatch(removeCartItem(id)),
  addItem: (item) => dispatch(addItemToCart(item)),
  decreaseItemQuantity: (item) => dispatch(decreaseItemQuantity(item))
})

export default connect(null, mapDispatchToProps)(CheckoutItem)