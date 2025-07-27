import React, { useState } from 'react';
import './App.css';

function App() {
  const [form, setForm] = useState({
    S: 100,
    K: 100,
    r: 0.05,
    sigma: 0.2,
    T: 1,
    nSims: 10000,
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/price', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          S: parseFloat(form.S),
          K: parseFloat(form.K),
          r: parseFloat(form.r),
          sigma: parseFloat(form.sigma),
          T: parseFloat(form.T),
          nSims: parseInt(form.nSims),
        }),
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      alert("Error calculating price. Check your backend is running.");
    }
  };

  return (
    <div className="App">
      <h1>Monte Carlo Option Pricer</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          {[
            { id: "S", label: "Stock Price" },
            { id: "K", label: "Strike Price" },
            { id: "r", label: "Interest Rate" },
            { id: "sigma", label: "Volatility" },
            { id: "T", label: "Time to Maturity" },
            { id: "nSims", label: "Simulations" },
          ].map((field) => (
            <div key={field.id} className="input-group">
              <label>{field.label}</label>
              <input
                name={field.id}
                value={form[field.id]}
                onChange={handleChange}
                type="number"
                step="any"
              />
            </div>
          ))}
        </div>
        <button type="submit">Calculate</button>
      </form>
      {result && (
        <div className="result-grid">
          <div className="result-box call">
            <h2>Call Price</h2>
            <p>${result.call_price.toFixed(4)}</p>
          </div>
          <div className="result-box put">
            <h2>Put Price</h2>
            <p>${result.put_price.toFixed(4)}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
