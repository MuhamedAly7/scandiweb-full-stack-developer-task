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

      // Check if there's an identical product in the cart (excluding the current product)
      const identicalProductIndex = state.findIndex(
        (item, index) =>
          index !== productIndex &&
          item.id === updatedProduct.id &&
          areAttributesIdentical(updatedProduct.attributes, item.attributes)
      );

      if (state[productIndex].quantity > 1) {
        // If quantity is greater than 1, decrement the original product's quantity
        state[productIndex].quantity -= 1;

        if (identicalProductIndex !== -1) {
          // If an identical product exists, increment its quantity by 1
          state[identicalProductIndex].quantity += 1;
        } else {
          // If no identical product exists, add a new product entry with the updated attributes
          state.push({ ...updatedProduct, quantity: 1 });
        }
      } else {
        // If quantity is 1
        if (identicalProductIndex !== -1) {
          // If an identical product exists, increment its quantity by 1 and remove the current product
          state[identicalProductIndex].quantity += 1;
          state.splice(productIndex, 1);
        } else {
          // If no identical product exists, update the product's attributes at the current index
          state[productIndex] = updatedProduct;
        }
      }
    },
    removeFromCart: (state, action) => {
      const productIndex = action.payload; // Index of the product in the cart array

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
      return []; // Reset cart to an empty array
    },
  },
});

export const { addToCart, clearCart, updateProductInCart, removeFromCart } =
  cartSlice.actions;
export default cartSlice.reducer;
