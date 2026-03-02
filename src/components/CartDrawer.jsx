import React from 'react';
import { useCart } from '../context/CartContext';
import './CartDrawer.css';

const CartDrawer = ({ onCheckout }) => {
    const { isCartOpen, toggleCart, cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

    const handleCheckout = () => {
        if (cartItems.length === 0) return;
        toggleCart(); // Close the drawer
        onCheckout(); // Open the checkout page
    };

    if (!isCartOpen) return null;

    return (
        <>
            <div className="cart-overlay" onClick={toggleCart}></div>
            <div className={`cart-drawer ${isCartOpen ? 'open' : ''}`}>
                <div className="cart-header">
                    <h2>Ваша корзина</h2>
                    <button className="close-cart" onClick={toggleCart} aria-label="Close cart">&times;</button>
                </div>

                <div className="cart-items">
                    {cartItems.length === 0 ? (
                        <p className="empty-cart-msg">Ваша корзина пуста.</p>
                    ) : (
                        cartItems.map((item) => (
                            <div key={item.product.id} className="cart-item">
                                <img src={item.product.image_url} alt={item.product.title} className="cart-item-image" />
                                <div className="cart-item-details">
                                    <h4>{item.product.title}</h4>
                                    <p className="item-price">{item.product.price} ₽</p>

                                    <div className="quantity-controls">
                                        <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>+</button>
                                    </div>
                                </div>
                                <button className="remove-item" onClick={() => removeFromCart(item.product.id)} aria-label="Remove item">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className="cart-footer">
                        <div className="cart-total">
                            <span>Итого:</span>
                            <span>{cartTotal} ₽</span>
                        </div>
                        <button className="checkout-button" onClick={handleCheckout}>Оформить заказ</button>
                    </div>
                )}
            </div>
        </>
    );
};

export default CartDrawer;
