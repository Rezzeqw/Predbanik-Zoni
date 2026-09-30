import React, { useState } from 'react';

const STALKER_PRODUCTS = [
    { id: 1, name: "Комбинезон Сева", price: 30000, description: "Отличная изоляция. Идеален для походов вглубь Зоны." },
    { id: 2, name: "Сайга 12К", price: 25000, description: "Крупнокалиберное оружие. Идеально подходит для боя на ближней дистанции." },
    { id: 3, name: "Водка", price: 500, description: "Помогает от радиации. Есть негативные последствия." },
    { id: 4, name: "Ак-74", price: 15000, description: "Твой Лучший друг в Зоне. Почти у каждого есть такой." },
    { id: 5, name: "СГи-Стрелка", price: 20000, description: "Поговаривают, что ее можно найти только в Последнем тайнике Стрелка, пока не удалось никоиму" },
    { id: 6, name: "Граната", price: 100, description: "Бахнет так, что либо выживет кто либо нет" },
    { id: 7, name: "Аптечка", price: 200, description: "Помогает при получении урона. Необходима для выживания в Зоне." },
];

export default function App() {
    const [cart, setCart] = useState({});
    const [view, setView] = useState('home');
    const [showReceipt, setShowReceipt] = useState(false);

    const addToCart = (id) => {
        setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    };

    const removeFromCart = (id) => {
        setCart(prev => {
            const updated = { ...prev };
            if (updated[id] > 1) {
                updated[id] -= 1;
            } else {
                delete updated[id];
            }
            return updated;
        });
    };

    const totalItems = Object.values(cart).reduce((sum, count) => sum + count, 0);

    const totalPrice = Object.entries(cart).reduce((sum, [id, count]) => {
        const product = STALKER_PRODUCTS.find(p => p.id === parseInt(id));
        return sum + (product ? product.price * count : 0);
    }, 0);

    return (
        <div className="app">
            <header className="header">
                <h1 className="logo" onClick={() => { setView('home'); setShowReceipt(false); }}>
                    Предбанник Зоны
                </h1>
                <button className="cartBtn" onClick={() => setView('cart')}>
                    🎒 КПК: Корзина ({totalItems})
                </button>
            </header>

            {view === 'home' && (
                <main className="main">
                    <h2 className="title">Доступные товары:</h2>
                    <div className="grid">
                        {STALKER_PRODUCTS.map((product) => {
                            const count = cart[product.id] || 0;
                            return (
                                <div key={product.id} className="card">
                                    <h3 className="cardTitle">{product.name}</h3>
                                    <p className="cardDesc">{product.description}</p>
                                    <p className="cardPrice">{product.price} RU</p>

                                    {count === 0 ? (
                                        <button className="buyBtn" onClick={() => addToCart(product.id)}>
                                            Купить
                                        </button>
                                    ) : (
                                        <div className="counterContainer">
                                            <button className="countBtn" onClick={() => removeFromCart(product.id)}>-</button>
                                            <span className="countValue">{count}</span>
                                            <button className="countBtn" onClick={() => addToCart(product.id)}>+</button>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </main>
            )}

            {view === 'cart' && (
                <main className="main">
                    <button className="backBtn" onClick={() => setView('home')}>← Назад к покупочкам</button>
                    <h2 className="title">Ваш рюкзак (Подготовка к сделке)</h2>

                    {totalItems === 0 ? (
                        <p className="emptyText">Рюкзак пуст. Вы ничего не вынесли из Зоны.</p>
                    ) : (
                        <div className="cartContent">
                            <ul className="itemList">
                                {Object.entries(cart).map(([id, count]) => {
                                    const product = STALKER_PRODUCTS.find(p => p.id === parseInt(id));
                                    if (!product) return null;
                                    return (
                                        <li key={id} className="itemRow">
                                            <span>{product.name} х{count}</span>
                                            <span>{product.price * count} RU</span>
                                        </li>
                                    );
                                })}
                            </ul>
                            <div className="totalRow">
                                <strong>Итого:</strong>
                                <strong>{totalPrice} RU</strong>
                            </div>

                            {!showReceipt ? (
                                <button className="checkoutBtn" onClick={() => setShowReceipt(true)}>
                                    Оформить заказ у Торговца
                                </button>
                            ) : (
                                <div className="receipt">
                                    <h3>📄 ТОРГОВЫЙ ЧЕК ЧЗО</h3>
                                    <hr className="hr" />
                                    <p><strong>Откуда:</strong>Северная Зона</p>
                                    <p><strong>Куда:</strong>Где указан Адрес</p>
                                    <p><strong>Зачем:</strong> Для успешного штурма Радара и выживания в Выбросе</p>
                                    <p><strong>Статус доставки:</strong> Оплачено. Принято на свой страх и риск.</p>
                                    <hr className="hr" />
                                    <p className="receiptFooter">Удачной охоты, сталкер!</p>
                                </div>
                            )}
                        </div>
                    )}
                </main>
            )}
        </div>
    );
}

