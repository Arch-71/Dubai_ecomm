"use client";

import React, { useState } from "react";

export default function CurrencyPage() {
  const [currency, setCurrency] = useState("");
  const [currencies, setCurrencies] = useState([]);

  const handleAddCurrency = (e) => {
    e.preventDefault();
    if (currency.trim() !== "") {
      setCurrencies([...currencies, currency]);
      setCurrency("");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto", padding: 24, border: "1px solid #eee", borderRadius: 8 }}>
      <h2>Add Currency</h2>
      <form onSubmit={handleAddCurrency} style={{ display: "flex", gap: 8 }}>
        <input
          type="text"
          placeholder="Enter currency (e.g. USD)"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          style={{ flex: 1, padding: 8 }}
        />
        <button type="submit" style={{ padding: "8px 16px" }}>
          Add
        </button>
      </form>
      <ul style={{ marginTop: 24 }}>
        {currencies.map((cur, idx) => (
          <li key={idx}>{cur}</li>
        ))}
      </ul>
    </div>
  );
}
