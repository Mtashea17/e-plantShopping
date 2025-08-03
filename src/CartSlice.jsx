import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
        const { name, image, cost } = action.payload; // Destructure product details from the action payload
        // Check if the item already exists in the cart by comparing names
        const existingItem = state.items.find(item => item.name === name);
        if (existingItem) {
          // If item already exists in the cart, increase its quantity
          existingItem.quantity++;
        } else {
          // If item does not exist, add it to the cart with quantity 1
          state.items.push({ name, image, cost, quantity: 1 });
        }
      },
          removeItemFromCart(state, action) {
            state.cartItems = state.cartItems.filter(item => item.name !== action.payload);
          },
          // Action to clear the cart
          // This sets the cartItems array to an empty array, effectively clearing the cart.
          // This action can be dispatched when the user wants to empty their cart.
          clearCart(state) {
            state.cartItems = [];
          },
    removeItem: (state, action) => {
        const itemId = action.payload; // Get the ID of the item to be removed from the action payload
        // Filter out the item with the given ID from the cart items
        state.items = state.items.filter(item => item.id !== itemId);
    },
    updateQuantity: (state, action) => {
        const { name, quantity } = action.payload; // Destructure the product name and new quantity from the action payload
        // Find the item in the cart that matches the given name
        const itemToUpdate = state.items.find(item => item.name === name);
        if (itemToUpdate) {
          itemToUpdate.quantity = quantity; // If the item is found, update its quantity to the new value
        }
    },
    incrementQuantity: (state, action) => {
        const itemId = action.payload; // Get the ID of the item to be incremented from the action payload
        // Find the item in the cart that matches the given ID
        const itemToIncrement = state.items.find(item => item.id === itemId);
        if (itemToIncrement) {
          itemToIncrement.quantity++; // If the item is found, increment its quantity by 1
        }
    },
    decrementQuantity: (state, action) => {
        const itemId = action.payload; // Get the ID of the item to be decremented from the action payload
        // Find the item in the cart that matches the given ID
        const itemToDecrement = state.items.find(item => item.id === itemId);
        if (itemToDecrement && itemToDecrement.quantity > 1) {
          itemToDecrement.quantity--; // If the item is found and its quantity is greater than 1, decrement its quantity by 1
        }
        // If the quantity is 1 or less, you might want to remove the item instead
        else if (itemToDecrement && itemToDecrement.quantity === 1) {
          state.items = state.items.filter(item => item.id !== itemId); // Remove the item if its quantity is 1
        }

      calculateTotalAmount: (state) => {
        // Calculate the total amount of all items in the cart
        return state.items.reduce((total, item) => total + (item.cost * item.quantity), 0).toFixed(2);
      }
    }
  }
    
});

export const { addItem, removeItemFromCart, updateQuantity, clearCart } = CartSlice.actions;

export default CartSlice.reducer;
