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
    if (window.confirm("Bu işlemi silmek istediğinize emin misiniz?")) {
      fetch(`http://localhost:8080/api/transactions/${id}`, {
        method: 'DELETE'
      })
        .then(() => fetchTransactions())
        .catch(err => alert("Silme hatası: " + err));
    }
  };

  return (
    <div>
      <h2>Tüm İşlemler</h2>
      <table className="table table-striped table-bordered mt-3">
        <thead className="table-dark">
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
                <button onClick={() => handleDelete(t.id)} className="btn btn-sm btn-danger">❌</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionsList;
