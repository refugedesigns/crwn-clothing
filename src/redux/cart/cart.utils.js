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

  return [...cartItems, { ...payload, quantity: 1}]
};
