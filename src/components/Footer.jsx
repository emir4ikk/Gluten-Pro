import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-brand">
                    <h3>Gluten Pro <span className="logo-dot">.</span></h3>
                    <p>Премиальные безглютеновые продукты, созданные для здорового образа жизни, с доставкой до вашей двери.</p>
                </div>

                <div className="footer-links">
                    <h4>Навигация</h4>
                    <ul>
                        <li><a href="#home">Главная</a></li>
                        <li><a href="#catalog">Каталог</a></li>
                        <li><a href="#about">О нас</a></li>
                    </ul>
                </div>

                <div className="footer-contact">
                    <h4>Контакты</h4>
                    <p>Email: hello@glutenpro.ru</p>
                    <p>Телефон: 8 (800) 555-35-35</p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Gluten Pro. Все права защищены.</p>
            </div>
        </footer>
    );
};

export default Footer;
