import React from 'react';
import './WhyUs.css';

const WhyUs = () => {
    const features = [
        {
            id: 1,
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            ),
            title: '100% без глютена',
            description: 'Строгие производственные процессы гарантируют абсолютную безопасность для людей с целиакией и непереносимостью глютена.'
        },
        {
            id: 2,
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            ),
            title: 'Премиальное качество',
            description: 'Мы используем только лучшие натуральные ингредиенты, без искусственных консервантов и усилителей вкуса.'
        },
        {
            id: 3,
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.5 12H16c-.7 2-2 3-4 3s-3.3-1-4-3H2.5" /><path d="M5.5 5.1L2 12v6c0 1.1.9 2 2 2h16a2 2 0 002-2v-6l-3.4-6.9A2 2 0 0016.8 4H7.2a2 2 0 00-1.8 1.1z" /></svg>
            ),
            title: 'Ручная работа',
            description: 'Наши блюда готовятся с любовью и заботой, сочетая традиционные рецепты с современными стандартами здорового питания.'
        }
    ];

    return (
        <section className="why-us" id="about">
            <div className="why-us-container">
                <div className="why-us-header">
                    <h2>Почему выбирают Gluten Pro?</h2>
                    <p>Мы верим, что безглютеновая диета не должна означать компромиссов во вкусе или удобстве.</p>
                </div>

                <div className="features-grid">
                    {features.map((feature) => (
                        <div key={feature.id} className="feature-card">
                            <div className="feature-icon">{feature.icon}</div>
                            <h3>{feature.title}</h3>
                            <p>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyUs;
