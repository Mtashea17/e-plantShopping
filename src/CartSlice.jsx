import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      // Check if the item already exists in the cart
      const existingItem = state.items.find(i => i.id === item.id);
      if (existingItem) {
        // If it exists, update the quantity
        existingItem.quantity += item.quantity;
      } else {
        // If it doesn't exist, add it to the cart
        state.items.push(item);
      }
    
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      // Filter out the item with the specified id
      state.items = state.items.filter(item => item.id !== itemId);
      // Alternatively, you could use splice if you want to remove by index
      // const index = state.items.findIndex(item => item.id === itemId);
      // if (index !== -1) {
      //   state.items.splice(index, 1);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      // Find the item in the cart and update its quantity
      const item = state.items.find(i => i.id === id);
      if (item) {
        item.quantity = quantity;
      }
      // If the quantity is 0, you might want to remove the item
      if (item && item.quantity <= 0) {
        state.items = state.items.filter(i => i.id !== id);
      }

    
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
