import React from 'react';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhyUs from './components/WhyUs';
import Bestsellers from './components/Bestsellers';
import Catalog from './components/Catalog';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import Checkout from './components/Checkout';
import './index.css';

function App() {
  const [isCheckoutOpen, setIsCheckoutOpen] = React.useState(false);

  return (
    <CartProvider>
      <div className="app-container">
        <Navbar />
        {isCheckoutOpen ? (
          <main>
            <Checkout onBack={() => setIsCheckoutOpen(false)} />
          </main>
        ) : (
          <main>
            <Hero />
            <WhyUs />
            <Bestsellers />
            <Catalog />
          </main>
        )}
        <Footer />
        <CartDrawer onCheckout={() => setIsCheckoutOpen(true)} />
      </div>
    </CartProvider>
  );
}

export default App;
