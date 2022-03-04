import React from 'react'

import { ReactComponent as ShoppingCart } from "../../assets/bag.svg"

import { connect } from 'react-redux'
import { toggleCartDropdown } from '../../redux/cart/cart.actions'

import "./cart-icon.styles.scss"

const CartIcon = ({toggleCartHidden}) => {
  return (
    <div className='cart-icon' onClick={toggleCartHidden}>
        <ShoppingCart className='shopping-icon' />
        <span className='item-count'> 0 </span>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  toggleCartHidden: () => dispatch(toggleCartDropdown())
})

export default connect(null, mapDispatchToProps)(CartIcon)