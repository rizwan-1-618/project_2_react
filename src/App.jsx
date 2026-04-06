import { BrowserRouter as Router, Routes, Route, Navigate, NavLink } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FinanceProvider } from './context/FinanceContext';
import { FiHome, FiList, FiPieChart, FiDollarSign } from 'react-icons/fi';

import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import AddTransaction from './pages/AddTransaction';
import Budget from './pages/Budget';
import Analytics from './pages/Analytics';

function App() {
  const getNavStyle = ({ isActive }) => ({
    padding: '0.85rem 1.25rem',
    borderRadius: '12px',
    textDecoration: 'none',
    color: isActive ? '#fff' : 'var(--text-secondary)',
    background: isActive ? 'var(--primary-color)' : 'transparent',
    display: 'flex',
    alignItems: 'center',
    gap: '0.8rem',
    fontWeight: isActive ? '600' : '500',
    transition: 'all 0.3s ease',
    marginBottom: '0.2rem'
  });

  return (
    <FinanceProvider>
      <Router>
        <div className="layout-wrapper" style={{ display: 'flex', gap: '2.5rem', minHeight: '100vh', margin: '0 auto', maxWidth: '1400px', flexDirection: 'row' }}>
          {/* Sidebar Navigation */}
          <nav className="glass-container" style={{ width: '260px', padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', height: 'fit-content', position: 'sticky', top: '2rem' }}>
            <h2 style={{ padding: '0 0.5rem', marginBottom: '2.5rem', color: 'var(--text-primary)', fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: 0 }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '1.2rem', boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)' }}>₹</div>
              FinAnalytics
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <NavLink to="/dashboard" style={getNavStyle}><FiHome size={18} /> Dashboard</NavLink>
              <NavLink to="/transactions" style={getNavStyle}><FiList size={18} /> Transactions</NavLink>
              <NavLink to="/budget" style={getNavStyle}><FiDollarSign size={18} /> Budget</NavLink>
              <NavLink to="/analytics" style={getNavStyle}><FiPieChart size={18} /> Analytics</NavLink>
            </div>
          </nav>

          {/* Main Content Area */}
          <main style={{ flex: 1, minWidth: 0, padding: '0 0 2rem 0' }}>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/transactions/new" element={<AddTransaction />} />
              <Route path="/budget" element={<Budget />} />
              <Route path="/analytics" element={<Analytics />} />
            </Routes>
          </main>
        </div>
        <ToastContainer theme="dark" position="bottom-right" toastStyle={{ background: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '16px' }} />
      </Router>
    </FinanceProvider>
  );
}

export default App;
