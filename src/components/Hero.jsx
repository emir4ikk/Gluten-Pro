import React from 'react';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero" id="home">
            <div className="hero-content">
                <h1 className="hero-title">
                    Безглютеновые продукты <br />
                    <span className="hero-highlight">Премиум-класса.</span>
                </h1>
                <p className="hero-subtitle">
                    Откройте для себя мир вкусных полуфабрикатов ручной работы, созданных без компромиссов.
                    Идеальный вкус, никакого глютена, с доставкой до вашей двери.
                </p>
                <div className="hero-actions">
                    <a href="#catalog" className="btn btn-primary">В каталог</a>
                    <a href="#about" className="btn btn-secondary">Подробнее</a>
                </div>        </div>
            <div className="hero-image-container">
                {/* Placeholder for an aesthetic hero graphic or abstract shape */}
                <div className="hero-image-blob"></div>
                <img
                    src="https://supabase.apexstack.ru/storage/v1/object/public/shop/Vareniki%20s%20VISHNEY.webp"
                    alt="Вкусная безглютеновая еда"
                    className="hero-image"
                />
            </div>
        </section>
    );
};

export default Hero;
