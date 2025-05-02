import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import AddTransaction from './components/AddTransaction';
import TransactionsList from './components/TransactionsList';

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3 mb-3">
        <Link className="navbar-brand" to="/">Muhasebe</Link>
        <div className="navbar-nav">
          <Link className="nav-link" to="/">Dashboard</Link>
          <Link className="nav-link" to="/add">Yeni İşlem</Link>
          <Link className="nav-link" to="/transactions">Tüm İşlemler</Link>
        </div>
      </nav>

      <div className="container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add" element={<AddTransaction />} />
          <Route path="/transactions" element={<TransactionsList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
