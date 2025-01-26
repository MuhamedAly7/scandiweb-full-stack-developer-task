import { createSlice } from "@reduxjs/toolkit";

// Helper function to check if attributes match
const areAttributesIdentical = (productAttributes, existingAttributes) => {
  return productAttributes.every((attr, i) =>
    attr.items.every(
      (item, j) => item.selected === existingAttributes[i].items[j].selected
    )
  );
};

export const cartSlice = createSlice({
  initialState: [],
  name: "cartSlice",
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;

      // Check for an identical product in the entire cart
      const identicalProduct = state.find(
        (item) =>
          item.id === product.id &&
          areAttributesIdentical(product.attributes, item.attributes)
      );

      if (identicalProduct) {
        // Increment quantity for the identical product
        identicalProduct.quantity += 1;
      } else {
        // Add as a new product if no identical product exists
        state.push(product);
      }
    },
    updateProductInCart: (state, action) => {
      const { updatedProduct, productIndex } = action.payload;

      // Check if the updated product is identical to any other product in the cart
      const identicalProductIndex = state.findIndex(
        (item, index) =>
          index !== productIndex &&
          item.id === updatedProduct.id &&
          areAttributesIdentical(updatedProduct.attributes, item.attributes)
      );

      if (identicalProductIndex !== -1) {
        // If an identical product is found, increment its quantity and remove the current product
        state[identicalProductIndex].quantity += state[productIndex].quantity;
        state.splice(productIndex, 1);
      } else {
        // If no identical product is found, simply update the product at the current index
        state[productIndex] = updatedProduct;
      }
    },
    removeFromCart: (state, action) => {
      const productIndex = action.payload;

      if (productIndex >= 0 && productIndex < state.length) {
        const product = state[productIndex];

        if (product.quantity > 1) {
          // Decrement quantity if it's greater than 1
          product.quantity -= 1;
        } else {
          // Remove the product from the cart if quantity equals 1
          state.splice(productIndex, 1);
        }
      }
    },
    clearCart: () => {
      return [];
    },
  },
});

export const { addToCart, clearCart, updateProductInCart, removeFromCart } =
  cartSlice.actions;
export default cartSlice.reducer;
