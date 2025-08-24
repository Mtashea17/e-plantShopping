
import { useState } from 'react';

import ProductList from './ProductList.jsx';
import './App.css';
import AboutUs from './AboutUs.jsx';

function App() {
  const [showProductList, setShowProductList] = useState(false);
  const [notification, setNotification] = useState({ visible: false, message: '' });

  const handleGetStartedClick = () => {
    setShowProductList(true);
  };

  const handleHomeClick = () => {
    setShowProductList(false);
  };
const handleContinueShopping = () => {
    setShowProductList(true);
  };
  
  // Show notification with product name
  const showNotification = (productName) => {
    setNotification({ visible: true, message: `${productName} added to cart!` });
    setTimeout(() => {
      setNotification({ visible: false, message: '' });
    }, 2000);
  };

  return (
    <div className="app-container">
      {/* Inline Notification component */}
      <div className={`notification ${notification.visible ? 'show' : ''}`}>{notification.message}</div>
      <div className={`landing-page ${showProductList ? 'fade-out' : ''}`}> 
        <div className="background-image"></div>
        <div className="content">
         <div className="landing_content">
         <h1>Welcome To Home Grown</h1>
          <div className="divider"></div>
          <p>Where Nature Thrives!</p>
         
          <button className="get-started-button" onClick={handleGetStartedClick}>
            Get Started
          </button>
         </div>
          <div className="aboutus_container">
          <AboutUs/>
          </div>
          </div>

      </div>
      <div className={`product-list-container ${showProductList ? 'visible' : ''}`}> 
        <ProductList onHomeClick={handleHomeClick} onAddToCartNotification={showNotification}/>
      </div>
    </div>
  );
}

export default App;



