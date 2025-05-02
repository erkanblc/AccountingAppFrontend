import React, { useEffect, useState } from 'react';

function Dashboard() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/transactions')
      .then(res => res.json())
      .then(data => setTransactions(data));
  }, []);

  const income = transactions.filter(t => t.type === 'INCOME').reduce((acc, t) => acc + t.amount, 0);
  const expense = transactions.filter(t => t.type === 'EXPENSE').reduce((acc, t) => acc + t.amount, 0);
  const balance = income - expense;
  const recent = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

  return (
    <div className="row">
      <div className="col-md-4 mb-3">
        <div className="card text-white bg-success p-3">
          <h5>Toplam Gelir</h5>
          <h4>{income.toFixed(2)} ₺</h4>
        </div>
      </div>
      <div className="col-md-4 mb-3">
        <div className="card text-white bg-danger p-3">
          <h5>Toplam Gider</h5>
          <h4>{expense.toFixed(2)} ₺</h4>
        </div>
      </div>
      <div className="col-md-4 mb-3">
        <div className="card text-white bg-primary p-3">
          <h5>Net Bakiye</h5>
          <h4>{balance.toFixed(2)} ₺</h4>
        </div>
      </div>

      <div className="col-12">
        <h3>Son 5 İşlem</h3>
        <ul className="list-group">
          {recent.map(t => (
            <li key={t.id} className="list-group-item">
              {t.date} - {t.category} - {t.amount} ₺
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
