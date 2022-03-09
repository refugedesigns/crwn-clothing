import { CartActionTypes } from "./cart.types";


export const toggleCartDropdown = () => ({
    type: CartActionTypes.TOGGLE_CART_DROPDOWN,
})

export const addItemToCart = (item) => ({
    type: CartActionTypes.ADD_ITEM,
    payload: item
})

export const removeCartItem = (id) => ({
    type: CartActionTypes.REMOVE_ITEM,
    payload: id
})

export const decreaseItemQuantity = item => ({
    type: CartActionTypes.DECREASE_QUANTITY,
    payload: item
})

