import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { products } from '../data/products';
import './Catalog.css';

const Catalog = () => {
    const [activeCategory, setActiveCategory] = useState('Все');

    // Extract unique categories
    const categories = ['Все', ...new Set(products.map(p => p.category))];

    // Filter products based on active category
    const filteredProducts = activeCategory === 'Все'
        ? products
        : products.filter(p => p.category === activeCategory);

    return (
        <section className="catalog" id="catalog">
            <div className="catalog-container">
                <div className="section-header">
                    <h2>Полный каталог товаров</h2>
                    <p>Всё необходимое для здоровой безглютеновой диеты</p>
                </div>

                <div className="category-filters">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                            onClick={() => setActiveCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="product-grid">
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {filteredProducts.length === 0 && (
                    <div className="no-products">
                        <p>В этой категории нет товаров.</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Catalog;
