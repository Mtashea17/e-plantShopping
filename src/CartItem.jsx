import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    // You can use the reduce method to sum up the total price of all items in the cart.
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2); 
  };

  const handleContinueShopping = (e) => {
    // Dispatch the action to navigate or perform a specific action when continuing shopping.
    dispatch(continueShopping()); 
    // You can also call the onContinueShopping prop if it's meant to handle external navigation.
    if (onContinueShopping) {
      onContinueShopping();
    }
  };

  const handleIncrement = (item) => {
    // Dispatch the incrementQuantity action with the item's ID.
    dispatch(incrementQuantity(item.id)); 
  };

   const handleDecrement = (item) => {
    // Dispatch the decrementQuantity action with the item's ID.
    dispatch(decrementQuantity(item.id)); 
  };

  const handleRemove = (item) => {
    // Dispatch the removeItem action with the item's ID to remove it from the cart.
    dispatch(removeItem(item.id)); 
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    return (item.price * item.quantity).toFixed(2); 
  };

  function calculateTotalCost(item) {
  // Extract the numeric value from the item's cost string
  // by removing the first character (currency symbol) and parsing as a float.
  const unitPrice = parseFloat(item.cost.substring(1));

  // Multiply the numeric unit price by the item's quantity to get the total cost.
  const totalCost = unitPrice * item.quantity;

  return totalCost;
}

// Function to calculate total cost for an item
const calculateTotalCost = (item) => {
  // Assuming item has properties 'quantity' and 'cost'
  const quantity = item.quantity || 1; // Default to 1 if quantity is not defined
  const cost = parseFloat(item.cost.replace(/[^0-9.-]+/g, '')); // Remove currency symbols and parse as float
  return quantity * cost; // Return the total cost
}


// Example usage:
const myItem = {
  quantity: 3,
  cost: "$12.50"
};


const totalItemCost = calculateTotalCost(myItem);
console.log(`The total cost for the item is: $${totalItemCost.toFixed(2)}`);

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


