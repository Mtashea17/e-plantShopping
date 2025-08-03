import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
   // add item to cart or increment quantity if it exists
   addToCart: (state, action) => {
    const item = action.payload;
    const existingItem = state.items.find((i) => i.id === item.id)
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        state.items.push({...item, quantity: 1})
    }
   },

   // remove item from cart by id
   removeFromCart: (state, action) => {
    const itemId = action.payload
    state.items = state.items.filter((item) => item.id !== itemId)
   },

   //update item quantity if item exists and quantity is valid
   updateQuantity: (state, action) => {
    const { id, quantity } = action.payload;
    const item = state.items.find((i) => i.id === id);
    if (item && quantity >= 1) {
        item.quantity = quantity;
    }
   },
},
});

// export actions and reducer for use in the redux store 
// Fixed: Changed addItem to addToCart and cartSlice to CartSlice
export const { addToCart, removeFromCart, updateQuantity } = CartSlice.actions;
export default CartSlice.reducer;