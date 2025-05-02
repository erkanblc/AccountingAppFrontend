import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddTransaction() {
  const [type, setType] = useState("INCOME");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const txn = { type, category, amount: parseFloat(amount), description, date };

    fetch('http://localhost:8080/api/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(txn)
    })
      .then(response => {
        if (!response.ok) throw new Error("Ekleme başarısız");
        return response.json();
      })
      .then(() => navigate('/'))
      .catch(err => alert("Hata: " + err.message));
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
      <h2>Yeni İşlem</h2>

      <div>
        <label>Tür:</label>
        <select value={type} onChange={e => setType(e.target.value)} required>
          <option value="INCOME">Gelir</option>
          <option value="EXPENSE">Gider</option>
        </select>
      </div>

      <div>
        <label>Kategori:</label>
        <input type="text" value={category} onChange={e => setCategory(e.target.value)} required />
      </div>

      <div>
        <label>Tutar:</label>
        <input type="number" value={amount} onChange={e => setAmount(e.target.value)} required />
      </div>

      <div>
        <label>Açıklama:</label>
        <input type="text" value={description} onChange={e => setDescription(e.target.value)} required />
      </div>

      <div>
        <label>Tarih:</label>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
      </div>

      <button type="submit" style={{ marginTop: '10px' }}>Kaydet</button>
    </form>
  );
}

export default AddTransaction;
