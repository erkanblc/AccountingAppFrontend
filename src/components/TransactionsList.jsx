import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function TransactionsList() {
  const [transactions, setTransactions] = useState([]);
  const [showToast, setShowToast] = useState(false);

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
        .then(() => {
          fetchTransactions();
          setShowToast(true);
          setTimeout(() => setShowToast(false), 3000);
        })
        .catch(err => alert("Silme hatası: " + err));
    }
  };

  return (
    <div>
      <h2>Tüm İşlemler</h2>

      {/* Toast mesajı */}
      <div
        className={`toast-container position-fixed bottom-0 end-0 p-3`}
        style={{ zIndex: 9999 }}
      >
        <div
          className={`toast align-items-center text-bg-success border-0 ${showToast ? 'show' : 'hide'}`}
          role="alert"
        >
          <div className="d-flex">
            <div className="toast-body">İşlem başarıyla silindi.</div>
          </div>
        </div>
      </div>

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
