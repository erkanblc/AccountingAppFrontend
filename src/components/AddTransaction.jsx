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
    <div className="card p-4">
      <h2 className="mb-3">Yeni İşlem</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Tür:</label>
          <select className="form-select" value={type} onChange={e => setType(e.target.value)} required>
            <option value="INCOME">Gelir</option>
            <option value="EXPENSE">Gider</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Kategori:</label>
          <input className="form-control" type="text" value={category} onChange={e => setCategory(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Tutar:</label>
          <input className="form-control" type="number" value={amount} onChange={e => setAmount(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Açıklama:</label>
          <input className="form-control" type="text" value={description} onChange={e => setDescription(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Tarih:</label>
          <input className="form-control" type="date" value={date} onChange={e => setDate(e.target.value)} required />
        </div>

        <button type="submit" className="btn btn-success">Kaydet</button>
      </form>
    </div>
  );
}

export default AddTransaction;
