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
    <div style={{ padding: '20px' }}>
      <h2>Dashboard</h2>
      <p>Toplam Gelir: {income.toFixed(2)} ₺</p>
      <p>Toplam Gider: {expense.toFixed(2)} ₺</p>
      <p>Net Bakiye: {balance.toFixed(2)} ₺</p>

      <h3>Son 5 İşlem</h3>
      <ul>
        {recent.map(t => (
          <li key={t.id}>
            {t.date} - {t.type === 'INCOME' ? 'Gelir' : 'Gider'} - {t.category} - {t.amount} ₺
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
