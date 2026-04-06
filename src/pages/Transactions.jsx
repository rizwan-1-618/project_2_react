import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTransactions } from '../hooks/useTransactions';
import TransactionCard from '../components/TransactionCard';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import { useNavigate } from 'react-router-dom';

const Transactions = () => {
  const { transactions, deleteTransaction } = useTransactions();
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: 'all',
    category: 'all',
    sort: 'date-desc'
  });

  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => {
      const matchSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (t.notes && t.notes.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchType = filters.type === 'all' || t.type === filters.type;
      const matchCategory = filters.category === 'all' || t.category.toLowerCase() === filters.category;
      
      return matchSearch && matchType && matchCategory;
    }).sort((a, b) => {
      switch (filters.sort) {
        case 'date-desc': return new Date(b.date) - new Date(a.date);
        case 'date-asc': return new Date(a.date) - new Date(b.date);
        case 'amount-desc': return Number(b.amount) - Number(a.amount);
        case 'amount-asc': return Number(a.amount) - Number(b.amount);
        default: return 0;
      }
    });
  }, [transactions, searchTerm, filters]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h1 style={{ margin: 0 }}>Transactions History</h1>
        <button className="glass-button" onClick={() => navigate('/transactions/new')}>+ Add New</button>
      </div>

      <div className="glass-container" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
        <SearchBar onSearch={setSearchTerm} />
        <Filters filters={filters} setFilters={setFilters} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
        <AnimatePresence>
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map(t => (
              <TransactionCard 
                key={t.id} 
                transaction={t} 
                onEdit={() => navigate(`/transactions/new`, { state: { transaction: t } })} 
                onDelete={deleteTransaction}
              />
            ))
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
              No transactions match your criteria.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Transactions;
