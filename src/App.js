import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import AddTransaction from './components/AddTransaction';
import TransactionsList from './components/TransactionsList';

function App() {
  return (
    <Router>
      <nav style={{ padding: '10px', background: '#f4f4f4' }}>
        <Link to="/" style={{ marginRight: '15px' }}>Dashboard</Link>
        <Link to="/add" style={{ marginRight: '15px' }}>Yeni İşlem</Link>
        <Link to="/transactions">Tüm İşlemler</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add" element={<AddTransaction />} />
        <Route path="/transactions" element={<TransactionsList />} />
      </Routes>
    </Router>
  );
}

export default App;
