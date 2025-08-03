import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity, addToCart } from './CartSlice';
import './CartItem.css'; // Import CSS file for component-specific styles

const CartItem = () => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  
  // Calculate total number of items in cart for cart icon
  const totalItemsInCart = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleContinueShopping = (e) => {
    // Dispatch the action to navigate or perform a specific action when continuing shopping.
    // Note: You'll need to import continueShopping from your slice
    // dispatch(continueShopping()); 
    console.log('Continue shopping clicked');
  };

  const handleIncrement = (item) => {
    // Dispatch the updateQuantity action with increased quantity
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    // Only decrement if quantity is greater than 1
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    }
  };

  const handleRemove = (item) => {
    // Dispatch the removeFromCart action with the item's ID to remove it from the cart.
    dispatch(removeFromCart(item.id)); 
  };

  // Calculate total cost for a single item
  const calculateTotalCost = (item) => {
    // Extract the numeric value from the item's cost string using parseFloat(item.cost.substring(1))
    const unitPrice = parseFloat(item.cost.substring(1));
    return (unitPrice * item.quantity).toFixed(2);
  };

  // Calculate total amount for all items
  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => {
      const unitPrice = parseFloat(item.cost.substring(1));
      return total + (unitPrice * item.quantity);
    }, 0).toFixed(2);
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cartItems.map(item => (
          <div className="cart-item" key={item.id}>
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