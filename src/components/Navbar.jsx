import React from 'react';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
    const { toggleCart, itemCount } = useCart();

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <a href="/" className="navbar-logo">
                    Gluten Pro <span className="logo-dot">.</span>
                </a>

                <ul className="navbar-menu">
                    <li><a href="#home">Главная</a></li>
                    <li><a href="#catalog">Каталог</a></li>
                    <li><a href="#about">О нас</a></li>
                </ul>

                <div className="navbar-actions">
                    <button className="cart-button" onClick={toggleCart} aria-label="Open cart">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                        {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
