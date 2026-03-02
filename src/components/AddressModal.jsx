import React, { useState, useEffect, useRef } from 'react';
import './AddressModal.css';

const AddressModal = ({ onClose, onConfirm }) => {
    const [deliveryType, setDeliveryType] = useState('courier'); // 'courier' or 'pickup'
    const [addressType, setAddressType] = useState('apartment'); // 'apartment', 'house', 'office'

    // Form states
    const [city, setCity] = useState('Евпатория');
    const [street, setStreet] = useState('');
    const [house, setHouse] = useState('');

    // Yandex SuggestView integration
    const suggestViewRef = useRef(null);

    useEffect(() => {
        let isCancelled = false;
        let suggestInstance = null;
        let pollInterval = null;

        const initSuggest = () => {
            if (isCancelled) return;
            const inputEl = document.getElementById('suggest-street');
            if (!inputEl) return;

            window.ymaps.ready(() => {
                if (isCancelled) return;

                try {
                    suggestInstance = new window.ymaps.SuggestView('suggest-street', {
                        boundedBy: [
                            [45.1500, 33.2800], // South-West of Evpatoria
                            [45.2400, 33.4200]  // North-East of Evpatoria
                        ],
                        strictBounds: true,
                        results: 5
                    });

                    suggestViewRef.current = suggestInstance;

                    suggestInstance.events.add('select', (e) => {
                        const selectedItem = e.get('item');
                        const fullAddress = selectedItem.value;
                        const parts = fullAddress.split(',').map(s => s.trim());

                        let targetStreet = fullAddress;
                        let targetHouse = '';

                        // Set entire string initially
                        setStreet(fullAddress);

                        const lastPart = parts[parts.length - 1];
                        if (/^\d+[A-ZА-Яа-я/-]*$/.test(lastPart)) {
                            targetHouse = lastPart;
                            setHouse(targetHouse);

                            targetStreet = parts.slice(0, -1).join(', ');
                            setStreet(targetStreet);
                        }
                    });
                } catch (err) {
                    console.error('Yandex Suggest error:', err);
                }
            });
        };

        if (window.ymaps) {
            initSuggest();
        } else {
            pollInterval = setInterval(() => {
                if (window.ymaps && document.getElementById('suggest-street')) {
                    clearInterval(pollInterval);
                    initSuggest();
                }
            }, 200);
        }

        return () => {
            isCancelled = true;
            if (pollInterval) clearInterval(pollInterval);
            if (suggestInstance && typeof suggestInstance.destroy === 'function') {
                suggestInstance.destroy();
            }
        };
    }, [deliveryType]); // re-run if deliveryType changes since it might unmount the form

    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation(); // <-- Prevent event from bubbling up to the Checkout form
        onConfirm({
            type: deliveryType,
            city,
            street,
            house,
            addressType
        });
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>&times;</button>

                {/* Left side: Form */}
                <div className="modal-form-section">
                    <div className="delivery-toggle">
                        <button
                            className={`toggle-btn ${deliveryType === 'courier' ? 'active' : ''}`}
                            onClick={() => setDeliveryType('courier')}
                            type="button"
                        >
                            Доставка курьером
                        </button>
                        <button
                            className={`toggle-btn ${deliveryType === 'pickup' ? 'active' : ''}`}
                            onClick={() => setDeliveryType('pickup')}
                            type="button"
                        >
                            Самовывоз
                        </button>
                    </div>

                    <p className="modal-subtitle">Выберите способ получения заказа, чтобы увидеть актуальное меню</p>

                    {deliveryType === 'courier' ? (
                        <>
                            <h2 className="modal-title">Куда доставим?</h2>
                            <div className="address-form">
                                <div className="input-field">
                                    <label>Ваш город</label>
                                    <select value={city} onChange={(e) => setCity(e.target.value)}>
                                        <option value="Евпатория">Евпатория</option>
                                    </select>
                                </div>

                                <div className="input-field">
                                    <label>Улица <span className="required">*</span></label>
                                    <input
                                        id="suggest-street"
                                        type="text"
                                        value={street}
                                        onChange={(e) => setStreet(e.target.value)}
                                        placeholder="Начните вводить..."
                                        required
                                    />
                                </div>

                                <div className="input-field half-width">
                                    <label>Дом <span className="required">*</span></label>
                                    <input
                                        type="text"
                                        value={house}
                                        onChange={(e) => setHouse(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="address-type-section">
                                    <label className="type-label">Тип адреса доставки <span className="required">*</span></label>
                                    <div className="type-toggle">
                                        <button
                                            type="button"
                                            className={`type-btn ${addressType === 'apartment' ? 'active' : ''}`}
                                            onClick={() => setAddressType('apartment')}
                                        >
                                            Квартира
                                        </button>
                                        <button
                                            type="button"
                                            className={`type-btn ${addressType === 'house' ? 'active' : ''}`}
                                            onClick={() => setAddressType('house')}
                                        >
                                            Дом
                                        </button>
                                        <button
                                            type="button"
                                            className={`type-btn ${addressType === 'office' ? 'active' : ''}`}
                                            onClick={() => setAddressType('office')}
                                        >
                                            Офис
                                        </button>
                                    </div>
                                </div>

                                {addressType === 'apartment' && (
                                    <div className="details-grid">
                                        <div className="input-field">
                                            <label>Квартира <span className="required">*</span></label>
                                            <input type="text" required />
                                        </div>
                                        <div className="input-field">
                                            <label>Подъезд</label>
                                            <input type="text" />
                                        </div>
                                        <div className="input-field">
                                            <label>Этаж</label>
                                            <input type="text" />
                                        </div>
                                        <div className="input-field">
                                            <label>Домофон</label>
                                            <input type="text" />
                                        </div>
                                    </div>
                                )}

                                <button type="button" className="confirm-btn" onClick={handleSubmit}>
                                    Подтвердить
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <h2 className="modal-title">Пункт самовывоза</h2>
                            <div className="pickup-info">
                                <div className="pickup-point-card">
                                    <div className="pickup-icon">📍</div>
                                    <div className="pickup-details">
                                        <h3 className="pickup-address">г. Евпатория, ул. 51-й Армии, д. 54</h3>
                                        <div className="pickup-hours">
                                            <span className="hours-icon">🕐</span>
                                            <span>Ежедневно с <strong>9:00</strong> до <strong>21:00</strong></span>
                                        </div>
                                    </div>
                                </div>
                                <button type="button" className="confirm-btn" onClick={() => {
                                    onConfirm({
                                        type: 'pickup',
                                        city: 'Евпатория',
                                        street: 'ул. 51-й Армии',
                                        house: '54',
                                        addressType: 'pickup'
                                    });
                                    onClose();
                                }}>
                                    Заберу отсюда
                                </button>
                            </div>
                        </>
                    )}
                </div>

                {/* Right side: Yandex Map */}
                <div className="modal-map-section">
                    <iframe
                        src={deliveryType === 'pickup'
                            ? "https://yandex.ru/map-widget/v1/?ll=33.380087%2C45.197628&z=16&pt=33.380087%2C45.197628%2Cpm2rdm"
                            : "https://yandex.ru/map-widget/v1/?ll=33.364239%2C45.193181&z=13"
                        }
                        title="Yandex Maps Евпатория"
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        allowFullScreen={true}
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default AddressModal;
