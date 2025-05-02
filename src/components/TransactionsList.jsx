import React, { useEffect, useState } from 'react';

function TransactionsList() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = () => {
    fetch('http://localhost:8080/api/transactions')
      .then(res => res.json())
      .then(data => setTransactions(data));
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Bu işlemi silmek istediğinize emin misiniz?");
    if (confirmDelete) {
      fetch(`http://localhost:8080/api/transactions/${id}`, {
        method: 'DELETE'
      })
      .then(() => fetchTransactions())
      .catch(err => alert("Silme hatası: " + err));
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Tüm İşlemler</h2>
      <table border="1" cellPadding="5" cellSpacing="0">
        <thead>
          <tr>
            <th>Tarih</th>
            <th>Tür</th>
            <th>Kategori</th>
            <th>Açıklama</th>
            <th>Tutar</th>
            <th>Sil</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(t => (
            <tr key={t.id}>
              <td>{t.date}</td>
              <td>{t.type === 'INCOME' ? 'Gelir' : 'Gider'}</td>
              <td>{t.category}</td>
              <td>{t.description}</td>
              <td>{t.amount} ₺</td>
              <td>
                <button onClick={() => handleDelete(t.id)} style={{ color: 'red' }}>❌</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionsList;
