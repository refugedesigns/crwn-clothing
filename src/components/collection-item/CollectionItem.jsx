import React from "react";
import { connect } from "react-redux";
import { addItemToCart } from "../../redux/cart/cart.actions";

import CustomButton from "../ui-components/custom-button/CustomButton";

import "./collection-item.styles.scss";

const CollectionItem = ({ item, addItemToCart }) => {
  const { id, name, price, imageUrl } = item;
  const handleAddItem = () => {
    const item = {
      id,
      name,
      price,
      imageUrl,
    };

    addItemToCart(item);
  };

  return (
    <div className="collection-item">
      <div className="image" style={{ backgroundImage: `url(${imageUrl})` }} />
      <div className="collection-footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <CustomButton className="custom-button" onClick={handleAddItem} inverted>
        {" "}
        Add to cart{" "}
      </CustomButton>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addItemToCart: (item) => dispatch(addItemToCart(item)),
});

export default connect(null, mapDispatchToProps)(CollectionItem);
