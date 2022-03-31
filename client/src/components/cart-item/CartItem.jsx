import React from "react";

import "./cart-item.styles.scss";

const CartItem = ({ name, imageUrl, price, quantity }) => {
  return (
    <div className="cart-item">
      <img src={imageUrl} alt={name} />
      <div className="item-details">
        <div className="name">{name}</div>
        <div>{quantity} X ${price}</div>
      </div>
    </div>
  );
};

export default CartItem;
