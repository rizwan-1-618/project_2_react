import React from 'react';
import { motion } from 'framer-motion';
import { useTransactions } from '../hooks/useTransactions';
import { useBudget } from '../hooks/useBudget';
import { formatCurrency } from '../utils/currencyFormatter';
import { TrendLineChart } from '../components/Charts';
import { Link } from 'react-router-dom';

const MotionLink = motion(Link);

const Dashboard = () => {
  const { transactions } = useTransactions();
  const { totalExpenses, totalIncome } = useBudget();

  const recentTransactions = transactions.slice(0, 5);
  
  // Prepare daily data for Trend Chart
  const trendData = [...transactions]
    .filter(t => t.type === 'expense')
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(-10)
    .map(t => ({
      date: new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      amount: Number(t.amount)
    }));

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ margin: 0 }}>Dashboard Overview</h1>
        <MotionLink whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} to="/transactions/new" className="glass-button" style={{ textDecoration: 'none' }}>+ Add New</MotionLink>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="glass-card" style={{ padding: '1.5rem' }}>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Total Income</p>
          <h2 className="tabular-nums" style={{ color: 'var(--success)', margin: 0 }}>{formatCurrency(totalIncome)}</h2>
        </motion.div>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="glass-card" style={{ padding: '1.5rem' }}>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Total Expenses</p>
          <h2 className="tabular-nums" style={{ color: 'var(--danger)', margin: 0 }}>{formatCurrency(totalExpenses)}</h2>
        </motion.div>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="glass-card" style={{ padding: '1.5rem' }}>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Net Balance</p>
          <h2 className="tabular-nums" style={{ color: totalIncome - totalExpenses >= 0 ? 'var(--text-primary)' : 'var(--danger)', margin: 0 }}>
            {formatCurrency(totalIncome - totalExpenses)}
          </h2>
        </motion.div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <motion.div whileHover={{ scale: 1.01 }} className="glass-container" style={{ padding: '1.5rem' }}>
          <h3 style={{ marginBottom: '1rem', marginTop: 0 }}>Recent Expense Trend</h3>
          <TrendLineChart data={trendData} />
        </motion.div>

        <motion.div whileHover={{ scale: 1.01 }} className="glass-container" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ margin: 0 }}>Recent Transactions</h3>
            <MotionLink whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} to="/transactions" style={{ color: 'var(--primary-color)', textDecoration: 'none', fontSize: '0.9rem' }}>View All</MotionLink>
          </div>
          {recentTransactions.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {recentTransactions.map((t, index) => (
                <motion.div whileHover={{ scale: 1.01 }} key={t.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.5rem', borderBottom: index < recentTransactions.length - 1 ? '0.5px solid rgba(255, 255, 255, 0.4)' : 'none' }}>
                  <div style={{ overflow: 'hidden' }}>
                    <p style={{ margin: '0 0 0.25rem 0', fontWeight: '500', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.title}</p>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{t.category}</p>
                  </div>
                  <span className="tabular-nums" style={{ color: t.type === 'income' ? 'var(--success)' : (t.type === 'expense' ? 'var(--danger)' : 'var(--text-primary)'), fontWeight: '600', marginLeft: '1rem' }}>
                    {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                  </span>
                </motion.div>
              ))}
            </div>
          ) : (
            <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '2rem 0' }}>No transactions yet.</p>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
