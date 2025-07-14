'use client '

import React, { useState } from "react";


export default function CurrenciesPage() {
    const [currencies, setCurrencies] = useState([]);
    const [newCurrency, setNewCurrency] = useState('');

    const handleAddCurrency = () => {
        if (newCurrency.trim() !== '') {
            setCurrencies([...currencies, newCurrency]);
            setNewCurrency('');
        }
    };

    return (
        <div>
            <h2>Currencies</h2>
            <ul>
                {currencies.map((currency, index) => (
                    <li key={index}>{currency}</li>
                ))}
            </ul>
            <input
                type="text"
                value={newCurrency}
                onChange={(e) => setNewCurrency(e.target.value)}
            />
            <button onClick={handleAddCurrency}>Add Currency</button>
        </div>
    );
}
