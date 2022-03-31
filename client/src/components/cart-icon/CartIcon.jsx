import React from 'react'
import { createStructuredSelector } from 'reselect'

import { ReactComponent as ShoppingCart } from "../../assets/bag.svg"

import { connect } from 'react-redux'
import { toggleCartDropdown } from '../../redux/cart/cart.actions'

import "./cart-icon.styles.scss"
import { selectCartItemsCount } from "../../redux/cart/cart.selectors";

const CartIcon = ({toggleCartHidden, itemCount}) => {
  return (
    <div className='cart-icon' onClick={toggleCartHidden}>
        <ShoppingCart className='shopping-icon' />
        <span className='item-count'> {itemCount} </span>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  itemCount: selectCartItemsCount,
});

const mapDispatchToProps = dispatch => ({
  toggleCartHidden: () => dispatch(toggleCartDropdown())
})

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon)