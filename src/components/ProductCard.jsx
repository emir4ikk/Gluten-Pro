import React from 'react';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    return (
        <div className="product-card">
            <div className="product-image-container">
                <img src={product.image_url} alt={product.title} className="product-image" loading="lazy" />
            </div>
            <div className="product-content">
                <span className="product-category">{product.category}</span>
                <h3 className="product-title">{product.title}</h3>
                <p className="product-description">{product.description}</p>

                <div className="product-footer">
                    <span className="product-price">{product.price} ₽</span>
                    <button
                        className="add-to-cart-btn"
                        onClick={() => addToCart(product)}
                        aria-label={`Добавить ${product.title} в корзину`}
                    >
                        В корзину
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
