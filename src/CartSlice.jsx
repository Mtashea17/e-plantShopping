import { createSlice } from '@reduxjs/toolkit';
// src/CartSlice.jsx
const initialState = {
	items: [],
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem: (state, action) => {
			const item = action.payload;
			const existing = state.items.find(i => i.id === item.id);
			if (!existing) {
				state.items.push(item);
			}
		},
		removeItem: (state, action) => {
			state.items = state.items.filter(item => item.id !== action.payload);
		},
		updateQuantity: (state, action) => {
			const { id, quantity } = action.payload;
			const item = state.items.find(i => i.id === id);
			if (item) {
				item.quantity = quantity;
			}
		},
		clearCart: (state) => {
			// Clear the cart
			state.items = [];
		},
	},
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
