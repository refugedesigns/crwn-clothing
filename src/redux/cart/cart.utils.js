export const addItemToCart = (cartItems, payload) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === payload.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === payload.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...payload, quantity: 1 }];
};

export const removeCartItem = (cartItems, id) => {
  return cartItems.filter((cartItem) => cartItem.id !== id);
};

export const decreaseItemQuantity = (cartItems, payload) => {
  const existingItem = cartItems.find(cartItem => cartItem.id === payload.id)

  if(existingItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== payload.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === payload.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  ); 
}
