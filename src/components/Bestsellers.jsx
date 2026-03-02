import React from 'react';
import ProductCard from './ProductCard';
import { products } from '../data/products';
import './Bestsellers.css';

const Bestsellers = () => {
    // Get 4 distinct attractive products (e.g. from different categories)
    const bestsellers = [
        products.find(p => p.id === 1) || products[0],
        products.find(p => p.id === 6) || products[1],
        products.find(p => p.id === 18) || products[2],
        products.find(p => p.id === 28) || products[3],
    ];

    return (
        <section className="bestsellers" id="bestsellers">
            <div className="bestsellers-container">
                <div className="section-header">
                    <h2>Наши хиты продаж</h2>
                    <p>Абсолютные фавориты, которые так любят наши клиенты</p>
                </div>
                <div className="product-grid">
                    {bestsellers.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
                <div className="view-all-container">
                    <a href="#catalog" className="btn btn-primary">Смотреть весь каталог</a>
                </div>
            </div>
        </section>
    );
};

export default Bestsellers;
