import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import AddressModal from './AddressModal';
import './Checkout.css';

// TODO: Вставьте сюда ваш CHAT ID. Узнать его можно через бота @getmyid_bot
const BOT_TOKEN = '8674649330:AAGgD-qPiIShwAHvSPR3EY8ud11xD53Q3EQ';
const CHAT_ID = '630393753';

const Checkout = ({ onBack }) => {
    const { cartItems, cartTotal, clearCart } = useCart();
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);

    // Form states
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [comment, setComment] = useState('');
    const [timeType, setTimeType] = useState('asap'); // 'asap', 'scheduled'
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmitOrder = async (e) => {
        e.preventDefault();

        if (cartItems.length === 0) {
            alert('Ваша корзина пуста');
            return;
        }

        if (CHAT_ID === 'YOUR_CHAT_ID_HERE') {
            alert('Системная ошибка: CHAT_ID не настроен. Свяжитесь с администратором.');
            return;
        }

        setIsSubmitting(true);

        try {
            // Format items list
            const itemsList = cartItems.map((item, index) =>
                `${index + 1}. ${item.product.title} - ${item.quantity} шт (${item.product.price * item.quantity} ₽)`
            ).join('\n');

            // Format Address details
            let addressInfo = 'Не указан';
            if (selectedAddress) {
                if (selectedAddress.type === 'courier') {
                    addressInfo = `Курьером: г. ${selectedAddress.city}, ул. ${selectedAddress.street}, д. ${selectedAddress.house}, Тип: ${selectedAddress.addressType}`;
                } else {
                    addressInfo = 'Самовывоз';
                }
            }

            // Create message
            const message = `
🔥 <b>Новый заказ!</b>

👤 <b>Контакты:</b>
Имя: ${name}
Телефон: ${phone}
Эл. почта: ${email || '-'}

📍 <b>Доставка:</b>
${addressInfo}
Время: ${timeType === 'asap' ? 'Как можно скорее' : 'Ко времени'}
Комментарий: ${comment || '-'}

🛒 <b>Заказ:</b>
${itemsList}

💰 <b>Итого к оплате: ${cartTotal} ₽</b>
            `;

            const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: CHAT_ID,
                    text: message,
                    parse_mode: 'HTML'
                })
            });

            const data = await response.json();

            if (data.ok) {
                alert('Заказ успешно оформлен! Мы скоро с вами свяжемся.');
                clearCart();
                onBack();
            } else {
                console.error('Telegram API error:', data);
                alert('Произошла ошибка при отправке заказа. Пожалуйста, попробуйте позже.');
            }

        } catch (error) {
            console.error('Error sending order:', error);
            alert('Произошла ошибка при отправке заказа. Пожалуйста, проверьте подключение к интернету.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form className="checkout-page" onSubmit={handleSubmitOrder}>
            <div className="checkout-container">
                <button type="button" className="back-btn" onClick={onBack}>
                    &lt; Назад
                </button>

                <h1 className="checkout-title">Оформление заказа</h1>

                <div className="checkout-content">
                    {/* Left Form Column */}
                    <div className="checkout-form-column">

                        {/* Contacts Section */}
                        <div className="checkout-card">
                            <h3 className="card-title">Ваши контакты</h3>
                            <div className="form-row-3">
                                <div className="input-field">
                                    <label>Имя <span className="required">*</span></label>
                                    <input
                                        type="text"
                                        placeholder="Имя"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="input-field">
                                    <label>Телефон <span className="required">*</span></label>
                                    <input
                                        type="tel"
                                        placeholder="+7 (___) ___-__-__"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="input-field">
                                    <label>Эл. почта</label>
                                    <input
                                        type="email"
                                        placeholder="Эл. почта"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Address Section */}
                        <div className="checkout-card">
                            <div className="address-header">
                                <h3 className="card-title">Адрес доставки</h3>
                                <button type="button" className="select-delivery-btn" onClick={() => setIsAddressModalOpen(true)}>
                                    Выбрать доставку
                                </button>
                            </div>

                            <div className="address-selection-box">
                                {selectedAddress ? (
                                    <div className="selected-address-info">
                                        <strong>Доставка курьером:</strong>
                                        <p>{selectedAddress.city}, ул. {selectedAddress.street}, д. {selectedAddress.house}</p>
                                        <button type="button" className="change-address-btn" onClick={() => setIsAddressModalOpen(true)}>
                                            Изменить
                                        </button>
                                    </div>
                                ) : (
                                    <button type="button" className="add-address-btn" onClick={() => setIsAddressModalOpen(true)}>
                                        <span className="plus-icon">+</span>
                                        Выбрать адрес
                                    </button>
                                )}
                            </div>

                            <div className="input-field full-width">
                                <label>Комментарий</label>
                                <textarea
                                    placeholder="Комментарий"
                                    rows="3"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                ></textarea>
                            </div>
                        </div>

                        {/* Time Section */}
                        <div className="checkout-card">
                            <h3 className="card-title">Время приготовления</h3>
                            <div className="time-toggle">
                                <button
                                    type="button"
                                    className={`time-btn ${timeType === 'asap' ? 'active' : ''}`}
                                    onClick={() => setTimeType('asap')}
                                >
                                    Как можно скорее
                                </button>
                                <button
                                    type="button"
                                    className={`time-btn ${timeType === 'scheduled' ? 'active' : ''}`}
                                    onClick={() => setTimeType('scheduled')}
                                >
                                    Ко времени
                                </button>
                            </div>
                        </div>

                    </div>

                    {/* Right Summary Column */}
                    <div className="checkout-summary-column">
                        <div className="checkout-card sticky-card">
                            <h3 className="summary-title">Ваш заказ</h3>

                            <div className="summary-items">
                                {cartItems.map(item => (
                                    <div key={item.product.id} className="summary-item">
                                        <div className="summary-item-info">
                                            <span className="summary-item-name">{item.product.title}, {item.quantity} шт</span>
                                        </div>
                                        <span className="summary-item-price">{item.product.price * item.quantity} ₽</span>
                                    </div>
                                ))}
                            </div>

                            <div className="summary-totals">
                                <div className="summary-row">
                                    <span>{cartItems.reduce((acc, item) => acc + item.quantity, 0)} товара</span>
                                    <span>{cartTotal} ₽</span>
                                </div>
                                <div className="summary-row">
                                    <span>Доставка</span>
                                    <span>0 ₽</span>
                                </div>
                            </div>

                            <div className="summary-final">
                                <span>Итого к оплате</span>
                                <strong>{cartTotal} ₽</strong>
                            </div>

                            <button type="submit" className="checkout-submit-btn" disabled={isSubmitting}>
                                {isSubmitting ? 'Оформление...' : `Оформить за ${cartTotal} ₽`}
                            </button>
                            <p className="agreement-text">
                                Нажимая кнопку «Оформить», вы соглашаетесь с условиями обработки персональных данных.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {isAddressModalOpen && (
                <AddressModal
                    onClose={() => setIsAddressModalOpen(false)}
                    onConfirm={(addr) => setSelectedAddress(addr)}
                />
            )}
        </form>
    );
};

export default Checkout;
