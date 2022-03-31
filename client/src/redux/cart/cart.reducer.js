import { CartActionTypes } from "./cart.types";
import { addItemToCart, removeCartItem, decreaseItemQuantity } from "./cart.utils";


const INITIAL_STATE = {
    showCart: false,
    cartItems: []
}

const cartReducer = (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case CartActionTypes.TOGGLE_CART_DROPDOWN:
            return {
                ...state,
                showCart: !state.showCart
            }
        case CartActionTypes.ADD_ITEM:
            return {
                ...state,
                cartItems: addItemToCart(state.cartItems, action.payload)
            }
        case CartActionTypes.REMOVE_ITEM:
            return {
                ...state,
                cartItems: removeCartItem(state.cartItems, action.payload)
            }
        case CartActionTypes.DECREASE_QUANTITY:
            return {
                ...state,
                cartItems: decreaseItemQuantity(state.cartItems, action.payload)
            }
        case CartActionTypes.RESET_CART:
            return {
                ...state,
                cartItems: []
            }
        default:
            return state;
    }
}

export default cartReducer